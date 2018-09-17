/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("CetesMesGetCtrl", ["$scope", "IndicesService", CetesMesGetCtrl]);

    function CetesMesGetCtrl($scope, IndicesService) {


        $scope.tipo = "1";

        $scope.resultadosBusqueda = [];

        $scope.fechai = new Date();
        $scope.fechat = new Date();

        $scope.classPositiva = "0";

        $scope.fechai.setDate($scope.fechai.getDate() - 30);

        $scope.primerValor = "";
        $scope.primerDiferencia = "";


        $scope.labels = [];
        $scope.series = ['Series A'];

        $scope.data = [];


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



        $scope.cetesUno = function() {

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

                IndicesService.getCetes28(registro).then(
                    function(result) {

                        $scope.resultadosBusqueda = result.data.records;
                        $scope.primerValor = $scope.resultadosBusqueda[0].valor;
                        $scope.primerDiferencia = $scope.resultadosBusqueda[0].difDiaAnterior;

                        var datoEntero = parseFloat($scope.primerDiferencia);

                        if (datoEntero > 0.01) {
                            $scope.classPositiva = "1";
                        } else {
                            $scope.classPositiva = "0";
                        }


                        for (var i = 0; i < $scope.resultadosBusqueda.length; i++) {
                            $scope.labels.push($scope.resultadosBusqueda[i].fecha);
                            $scope.data.push($scope.resultadosBusqueda[i].valor);
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



        $scope.cetesDos = function() {

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


                IndicesService.getCetes91(registro).then(
                    function(result) {
                        $scope.resultadosBusqueda = result.data.records;

                        $scope.primerValor = $scope.resultadosBusqueda[0].valor;
                        $scope.primerDiferencia = $scope.resultadosBusqueda[0].difDiaAnterior;

                        var datoEntero = parseFloat($scope.primerDiferencia);

                        if (datoEntero > 0.01) {
                            $scope.classPositiva = "1";
                        } else {
                            $scope.classPositiva = "0";
                        }

                        for (var i = 0; i < $scope.resultadosBusqueda.length; i++) {
                            $scope.labels.push($scope.resultadosBusqueda[i].fecha);
                            $scope.data.push($scope.resultadosBusqueda[i].valor);
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

                if ($scope.tipo == "1") {


                    IndicesService.getCetes28(registro).then(
                        function(result) {

                            $scope.resultadosBusqueda = result.data.records;
                            $scope.primerValor = $scope.resultadosBusqueda[0].valor;
                            $scope.primerDiferencia = $scope.resultadosBusqueda[0].difDiaAnterior;

                            var datoEntero = parseFloat($scope.primerDiferencia);

                            if (datoEntero > 0.01) {
                                $scope.classPositiva = "1";
                            } else {
                                $scope.classPositiva = "0";
                            }

                            for (var i = 0; i < $scope.resultadosBusqueda.length; i++) {
                                $scope.labels.push($scope.resultadosBusqueda[i].fecha);
                                $scope.data.push($scope.resultadosBusqueda[i].valor);
                            }

                        },
                        function(err) {
                            toastr.error("No se han podido cargar la información solicitada");
                        }
                    );
                } else {
                    if ($scope.tipo == "2") {

                        IndicesService.getCetes91(registro).then(
                            function(result) {
                                $scope.resultadosBusqueda = result.data.records;
                            },
                            function(err) {
                                toastr.error("No se han podido cargar la información solicitada");
                            }
                        );

                    }
                }
            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }

        }

        $scope.obtenerInformacion();

    }
})();