﻿/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("DolarGetCtrl", ["$scope", "IndicesService", 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', DolarGetCtrl]);

    function DolarGetCtrl($scope, IndicesService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {



        $scope.resultadosBusqueda = [];
        $scope.resultadosBusqueda1 = [];
        $scope.resultadosBusqueda2 = [];
        $scope.resultadosBusqueda3 = [];
        $scope.registrofechas = [];

        $scope.fechai = new Date();
        $scope.fechat = new Date();


        $scope.fechaiC1 = new Date();
        $scope.fechatC1 = new Date();

        $scope.fechaiC2 = new Date();
        $scope.fechatC2 = new Date();

        $scope.fechaiC3 = new Date();
        $scope.fechatC3 = new Date();

        $scope.classPositiva = "0";

        $scope.fechai.setDate($scope.fechai.getDate() - 30);
        $scope.fechaiC1.setDate($scope.fechaiC1.getDate() - 30);
        $scope.fechaiC2.setDate($scope.fechaiC2.getDate() - 30);
        $scope.fechaiC3.setDate($scope.fechaiC3.getDate() - 30);

        $scope.primerValor = "";
        $scope.primerDiferencia = "";
        $scope.anteriorValor = "";


        $scope.mostrarGaficaResultados = false;
        $scope.mostrarGaficaComparativa = false;

        $scope.labels = [];
        $scope.series = ['Series A'];

        $scope.data = [];

        $scope.dtOptions = DTOptionsBuilder.newOptions().withButtons([{
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-download"></i> Descargar Excel',
                    className: 'btn btn-success',
                    title: 'dolar'
                },
                {
                    text: '<i class="fa fa-download"></i> Descargar PDF',
                    key: '1',
                    className: 'btn btn-success',
                    action: function(e, dt, node, config) {
                        $scope.exportpdf();
                    }
                },
                {
                    text: '<i class="fa fa-download"></i> Descargar gráfica PDF',
                    key: '1',
                    className: 'btn btn-success',
                    action: function(e, dt, node, config) {
                        $scope.exportGraficapdf();
                    }
                }
            ])
            .withDOM('lftr<"default"ip><"clear">B')
            .withOption('order', false)
            .withDisplayLength(10);


        $scope.reset = function() {
            $scope.fechai = new Date();
            $scope.fechat = new Date();

            $scope.fechaiC1 = new Date();
            $scope.fechatC1 = new Date();

            $scope.fechaiC2 = new Date();
            $scope.fechatC2 = new Date();

            $scope.fechaiC3 = new Date();
            $scope.fechatC3 = new Date();


            $scope.resultadosBusqueda = [];
            $scope.resultadosBusqueda1 = [];
            $scope.resultadosBusqueda2 = [];
            $scope.resultadosBusqueda3 = [];

            $scope.ValidForm.$setPristine();
            $scope.$broadcast('angucomplete-alt:clearInput');
        };

        $scope.cambiafecha = function() {
            var fechaHoy = new Date();

            if ($scope.fechai > fechaHoy) {
                toastr.warning("La fecha de inicio no debe se mayor a la actual.", '', { timeOut: 10000 });
                $scope.fechai = new Date();
            }

            if ($scope.fechat > fechaHoy) {
                toastr.warning("La fecha de termino no debe se mayor a la actual.", '', { timeOut: 10000 });
                $scope.fechat = new Date();
            }

            if ($scope.fechai > $scope.fechat) {
                toastr.warning("La fecha de inicio no debe se mayor a la fecha de termino.", '', { timeOut: 10000 });
                $scope.fechai = new Date();
            }



        };

        $scope.update = function() {
            $scope.obtenerInformacion();
        }

        $scope.obtenerInformacion = function() {
            if ($scope.fechai != "" || $scope.fechat != "") {
                var diaInicio = $scope.fechai.getDate();
                var monthInicio = $scope.fechai.getMonth() + 1;

                if (monthInicio < 10) {
                    monthInicio = "0" + monthInicio;
                }

                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechai.getFullYear();

                var diaTermino = $scope.fechat.getDate();
                var monthTermino = $scope.fechat.getMonth() + 1;

                if (monthTermino < 10) {
                    monthTermino = "0" + monthTermino;
                }

                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechat.getFullYear();

                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };

                IndicesService.getDolar(registro).then(
                    function(result) {

                        $scope.resultadosBusqueda = result.data.records;
                        $scope.primerValor = $scope.resultadosBusqueda[0].valor;

                        $scope.anteriorValor = $scope.resultadosBusqueda[1].valor;

                        var datoEntero = parseFloat($scope.primerValor) - parseFloat($scope.anteriorValor);

                        $scope.primerDiferencia = datoEntero.toFixed(4);

                        if (datoEntero > 0.01) {
                            $scope.classPositiva = "1";
                        } else {
                            $scope.classPositiva = "0";
                        }

                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );



            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }

        }

        $scope.obtenerInformacion();


        $scope.exportpdf = function() {
            var imageHeader = "data:image/jpeg;base64,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AEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAM4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADTQAAAAYAAAAAAAAAAAAAADkAAAA5AAAADABTAGkAbgAgAHQA7QB0AHUAbABvAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAOQAAADkAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAADkAAAAAUmdodGxvbmcAAAA5AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAA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bS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xMlQxMzoxMzoyNC0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNy0xMlQxMzoxMzoyNC0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDctMTJUMTM6MTM6MjQtMDU6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTZCRDc4ODhFOTg1RTgxMUEzNTE5NEVBOUEyNDRCNEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVCRDc4ODhFOTg1RTgxMUEzNTE5NEVBOUEyNDRCNEIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNUJENzg4OEU5ODVFODExQTM1MTk0RUE5QTI0NEI0QiIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQWRvYmUgUkdCICgxOTk4KSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTVCRDc4ODhFOTg1RTgxMUEzNTE5NEVBOUEyNDRCNEIiIHN0RXZ0OndoZW49IjIwMTgtMDctMTJUMTM6MTM6MjQtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNkJENzg4OEU5ODVFODExQTM1MTk0RUE5QTI0NEI0QiIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQxMzoxMzoyNC0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gJASUNDX1BST0ZJTEUAAQEAAAIwQURCRQIQAABtbnRyUkdCIFhZWiAHzwAGAAMAAAAAAABhY3NwQVBQTAAAAABub25lAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUFEQkUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApjcHJ0AAAA/AAAADJkZXNjAAABMAAAAGt3dHB0AAABnAAAABRia3B0AAABsAAAABRyVFJDAAABxAAAAA5nVFJDAAAB1AAAAA5iVFJDAAAB5AAAAA5yWFlaAAAB9AAAABRnWFlaAAACCAAAABRiWFlaAAACHAAAABR0ZXh0AAAAAENvcHlyaWdodCAxOTk5IEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkAAAAZGVzYwAAAAAAAAARQWRvYmUgUkdCICgxOTk4KQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
            var docDOLAR = new jsPDF('l', 'pt');


            var fechaHoy1 = new Date();
            var mesHoy1 = fechaHoy1.getMonth() + 1;

            var fechaImprime = mesHoy1 + "/" + fechaHoy1.getDate() + "/" + fechaHoy1.getFullYear();

            var header = function(data) {
                docDOLAR.setFontSize(20);
                docDOLAR.setTextColor(40);
                docDOLAR.setFontStyle('normal');
                docDOLAR.addImage(imageHeader, 'JPGE', data.settings.margin.left, 17, 57, 57);
                //doc.addImage(imageHeader, 'PNG', data.settings.margin.left - 8, 20, 150, 77);
                docDOLAR.text("Dólar", data.settings.margin.left + 360, 60);
                docDOLAR.text("VERA, DIZ Y CIA., S.C.", data.settings.margin.left + 270, 31);



            };
            var totalPagesExp = "{total_pages_count_string}";
            var footer = function(data) {
                var str = "Página " + data.pageCount;
                // Total page number plugin only available in jspdf v1.0+
                if (typeof docDOLAR.putTotalPages === 'function') {
                    str = str + " de " + totalPagesExp;
                }
                docDOLAR.text(str, data.settings.margin.left, docDOLAR.internal.pageSize.height - 30);
                docDOLAR.setFontSize(8);
                docDOLAR.text(fechaImprime, data.settings.margin.left + 660, docDOLAR.internal.pageSize.height - 30);
            };

            var options = {
                beforePageContent: header,
                afterPageContent: footer,
                margin: { top: 105 },
                startY: 130,
                styles: { cellPadding: 2, overflow: 'linebreak' },
                headerStyles: {
                    rowHeight: 15,
                    fontSize: 8,
                    textColor: 255,
                    fillColor: [115, 135, 156],
                    fontStyle: 'bold'
                },
                bodyStyles: { rowHeight: 12, fontSize: 8, valign: 'top', halign: 'center' },
                columnStyles: {
                    0: { columnWidth: 50, halign: 'left' },
                    1: { columnWidth: 200, halign: 'left' },
                    2: { columnWidth: 250, halign: 'left' },
                    3: { columnWidth: 250, halign: 'center' }
                    //4: { halign: 'left' }
                }
            };

            var res = docDOLAR.autoTableHtmlToJson(document.getElementById("dolar"));
            docDOLAR.autoTable(res.columns, res.data, options);
            // Total page number plugin only available in jspdf v1.0+
            if (typeof docDOLAR.putTotalPages === 'function') {
                docDOLAR.putTotalPages(totalPagesExp);
            }

            docDOLAR.save("dolar.pdf");

        }


        $scope.exportGraficapdf = function() {
            var newCanvas = document.querySelector('#myChart');

            //create image from dummy canvas
            var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);


            var doc = new jsPDF('landscape');
            doc.setFontSize(20);

            doc.text(120, 15, "VERA, DIZ Y CIA., S.C.");


            doc.text(15, 30, "Gráfica del valor del dólar");



            doc.addImage(newCanvasImg, 'PNG', 10, 40, 280, 150);
            doc.save('graficadolar.pdf');
        }


        $scope.graficarResultados = function() {

            $scope.mostrarGaficaResultados = true;
            $scope.mostrarGaficaComparativa = false;

            if ($scope.fechai != "" || $scope.fechat != "") {
                var diaInicio = $scope.fechai.getDate();
                var monthInicio = $scope.fechai.getMonth() + 1;

                if (monthInicio < 10) {
                    monthInicio = "0" + monthInicio;
                }

                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechai.getFullYear();

                var diaTermino = $scope.fechat.getDate();
                var monthTermino = $scope.fechat.getMonth() + 1;

                if (monthTermino < 10) {
                    monthTermino = "0" + monthTermino;
                }

                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechat.getFullYear();

                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };

                IndicesService.graficaDolar(registro).then(
                    function(result) {

                        var data = {};

                        var data = {
                            labels: result.data.fechas,
                            datasets: [{
                                label: "$ MNX",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#90111A",
                                borderColor: "#000000",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#000000",
                                pointBackgroundColor: "#90111A",
                                pointBorderWidth: 1,
                                pointHoverRadius: 2,
                                pointHoverBackgroundColor: "#ffffff",
                                pointHoverBorderColor: "#90111A",
                                pointHoverBorderWidth: 3,
                                pointRadius: 2.5,
                                pointHitRadius: 2.5,
                                data: result.data.valores,
                                spanGaps: false,
                            }]
                        };
                        var ctx = document.getElementById("myChart");
                        $scope.myLineChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: {
                                scales: {
                                    xAxes: [{
                                        display: false
                                    }],
                                    yAxes: [{
                                        display: true,
                                        ticks: {
                                            min: 3,
                                            stepSize: 1
                                        }
                                    }],
                                }
                            },

                        });
                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );


            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }


            $scope.resultadosBusqueda1 = [];
            $scope.resultadosBusqueda2 = [];
            $scope.resultadosBusqueda3 = [];
        }


        $scope.graficaComparativa = function() {
            $scope.mostrarGaficaResultados = false;
            $scope.mostrarGaficaComparativa = true;

            $scope.comparativo1();

            $scope.resultadosBusqueda1 = [];
            $scope.resultadosBusqueda2 = [];
            $scope.resultadosBusqueda3 = [];

        }



        $scope.comparativo1 = function() {

            $scope.resultadosBusqueda1 = [];

            if ($scope.fechaiC1 != "" || $scope.fechatC1 != "") {
                var diaInicio = $scope.fechaiC1.getDate();
                var monthInicio = $scope.fechaiC1.getMonth() + 1;

                if (monthInicio < 10) {
                    monthInicio = "0" + monthInicio;
                }

                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechaiC1.getFullYear();

                var diaTermino = $scope.fechatC1.getDate();
                var monthTermino = $scope.fechatC1.getMonth() + 1;

                if (monthTermino < 10) {
                    monthTermino = "0" + monthTermino;
                }

                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechatC1.getFullYear();

                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };

                IndicesService.graficaDolar(registro).then(
                    function(result) {
                        $scope.resultadosBusqueda1 = result.data.valores;
                        $scope.registrofechas = result.data.fechas;

                        $scope.comparativo2();
                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );
            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }
        }


        $scope.comparativo2 = function() {

            $scope.resultadosBusqueda2 = [];

            if ($scope.fechaiC2 != "" || $scope.fechatC2 != "") {
                var diaInicio = $scope.fechaiC2.getDate();
                var monthInicio = $scope.fechaiC2.getMonth() + 1;

                if (monthInicio < 10) {
                    monthInicio = "0" + monthInicio;
                }

                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechaiC2.getFullYear();

                var diaTermino = $scope.fechatC2.getDate();
                var monthTermino = $scope.fechatC2.getMonth() + 1;

                if (monthTermino < 10) {
                    monthTermino = "0" + monthTermino;
                }

                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechatC2.getFullYear();

                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };

                IndicesService.graficaDolar(registro).then(
                    function(result) {
                        $scope.resultadosBusqueda2 = result.data.valores;
                        $scope.comparativo3();

                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );
            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }
        }

        $scope.comparativo3 = function() {

            $scope.resultadosBusqueda3 = [];

            if ($scope.fechaiC3 != "" || $scope.fechatC3 != "") {
                var diaInicio = $scope.fechaiC3.getDate();
                var monthInicio = $scope.fechaiC3.getMonth() + 1;

                if (monthInicio < 10) {
                    monthInicio = "0" + monthInicio;
                }

                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechaiC3.getFullYear();

                var diaTermino = $scope.fechatC3.getDate();
                var monthTermino = $scope.fechatC3.getMonth() + 1;

                if (monthTermino < 10) {
                    monthTermino = "0" + monthTermino;
                }

                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechatC3.getFullYear();

                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };

                IndicesService.graficaDolar(registro).then(
                    function(result) {
                        $scope.resultadosBusqueda3 = result.data.valores;


                        $scope.generaComparativa();

                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );
            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }
        }


        $scope.generaComparativa = function() {


            var data = {};

            var data = {
                labels: $scope.registrofechas,
                datasets: [{
                        label: "Cotización del dolar respecto al primer rango de fechas",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "#ff0000",
                        borderColor: "#ff0000",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#000000",
                        pointBackgroundColor: "#90111A",
                        pointBorderWidth: 1,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "#ff0000",
                        pointHoverBorderColor: "#90111A",
                        pointHoverBorderWidth: 3,
                        pointRadius: 2,
                        pointHitRadius: 2,
                        data: $scope.resultadosBusqueda1,
                        spanGaps: true,
                    },
                    {
                        label: "Cotización del dolar respecto al segundo rango de fechas",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "#2626FF",
                        borderColor: "#2626FF",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#000000",
                        pointBackgroundColor: "#90111A",
                        pointBorderWidth: 1,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "#2626FF",
                        pointHoverBorderColor: "#90111A",
                        pointHoverBorderWidth: 3,
                        pointRadius: 2,
                        pointHitRadius: 2,
                        data: $scope.resultadosBusqueda2,
                        spanGaps: true,
                    },
                    {
                        label: "Cotización del dolar respecto al tercer rango de fechas",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "#00B200",
                        borderColor: "#00B200",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#000000",
                        pointBackgroundColor: "#90111A",
                        pointBorderWidth: 1,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "#00B200",
                        pointHoverBorderColor: "#90111A",
                        pointHoverBorderWidth: 3,
                        pointRadius: 2,
                        pointHitRadius: 2,
                        data: $scope.resultadosBusqueda3,
                        spanGaps: true,
                    }

                ]
            };
            var ctx = document.getElementById("myChart2");
            $scope.myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: true,
                            labelString: '%',
                        }],
                        yAxes: [{
                            display: true,
                            labelString: '%',
                            ticks: {
                                min: -2,
                                stepSize: 1
                            }
                        }],
                    }
                },

            });


        }

    }
})();