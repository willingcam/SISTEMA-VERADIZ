/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("InflacionGetCtrl", ["$scope", "IndicesService", 'DTOptionsBuilder', InflacionGetCtrl]);

    function InflacionGetCtrl($scope, IndicesService, DTOptionsBuilder) {



        $scope.resultadosBusqueda = [];

        $scope.fechai = new Date();
        $scope.fechat = new Date();

        $scope.classPositiva = "0";

        $scope.fechai.setDate($scope.fechai.getDate() - 365);

        $scope.primerValor = "";
        $scope.primerDiferencia = "";
        $scope.anteriorValor = "";


        $scope.labels = [];
        $scope.series = ['Series A'];

        $scope.data = [];


        $scope.dtOptions = DTOptionsBuilder.newOptions().withButtons([{
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-download"></i> Descargar Excel',
                    className: 'btn btn-success',
                    title: 'Udis'
                },
                {
                    text: '<i class="fa fa-download"></i> Descargar PDF',
                    key: '1',
                    className: 'btn btn-success',
                    action: function(e, dt, node, config) {
                        $scope.exportpdf();
                    }
                }
            ])
            .withDOM('lftr<"default"ip><"clear">B')
            .withOption('order', false)
            .withDisplayLength(10);



        $scope.reset = function() {
            $scope.fechai = new Date();
            $scope.fechat = new Date();
            $scope.resultadosBusqueda = [];

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
                var fechaInicioParametro = monthInicio + "/" + diaInicio + "/" + $scope.fechai.getFullYear();

                var diaTermino = $scope.fechat.getDate();
                var monthTermino = $scope.fechat.getMonth() + 1;
                var fechaTerminoParametro = monthTermino + "/" + diaTermino + "/" + $scope.fechat.getFullYear();


                var registro = {
                    "fechai": fechaInicioParametro,
                    "fechat": fechaTerminoParametro
                };


                IndicesService.getInflacionAcumulada(registro).then(
                    function(result) {

                        $scope.resultadosBusqueda = result.data.records;
                        $scope.primerValor = $scope.resultadosBusqueda[0].imensual;

                        $scope.anteriorValor = $scope.resultadosBusqueda[1].imensual;

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


            var doc = new jsPDF('l', 'pt');

            var header = function(data) {
                doc.setFontSize(20);
                doc.setTextColor(40);
                doc.setFontStyle('normal');
                //doc.addImage(imageHeader, 'JPGE', data.settings.margin.left, 40, 150, 31);
                //doc.addImage(imageHeader, 'PNG', data.settings.margin.left - 8, 20, 150, 77);
                doc.text("UDIS", data.settings.margin.left + 270, 60);
            };
            var totalPagesExp = "{total_pages_count_string}";
            var footer = function(data) {
                var str = "Página " + data.pageCount;
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + " de " + totalPagesExp;
                }
                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
            };

            var options = {
                beforePageContent: header,
                afterPageContent: footer,
                margin: { top: 105 },
                startY: doc.autoTableEndPosY() + 130,
                styles: { cellPadding: 2, overflow: 'linebreak' },
                headerStyles: {
                    rowHeight: 15,
                    fontSize: 8,
                    textColor: 255,
                    fillColor: [115, 135, 156],
                    fontStyle: 'bold'
                },
                bodyStyles: { rowHeight: 12, fontSize: 8, valign: 'top', halign: 'left' },
                columnStyles: {
                    2: { columnWidth: 100 },
                    3: { columnWidth: 150 },
                    4: { columnWidth: 150, halign: 'left' },
                    7: { halign: 'center' }
                    //4: { halign: 'left' }
                }
            };

            var res = doc.autoTableHtmlToJson(document.getElementById("cetes"));
            doc.autoTable(res.columns, res.data, options);
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }

            doc.save("udis.pdf");

        }


    }
})();