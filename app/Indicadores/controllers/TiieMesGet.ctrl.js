/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("TiieMesGetCtrl", ["$scope", "IndicesService", TiieMesGetCtrl]);

    function TiieMesGetCtrl($scope, IndicesService) {

        $scope.actual = "28 días";
        $scope.periodoSel = "28 días";
        $scope.resultadosBusqueda = {};

        $scope.fechai = "";
        $scope.fechat = "";

        $scope.periodo = [{
                "id": "1",
                "descripcion": "28 días"
            },
            {
                "id": "2",
                "descripcion": "91 días"
            }
        ];


        $scope.reset = function() {
            $scope.fechai = new Date();
            $scope.fechat = new Date();
            $scope.resultadosBusqueda = {};
            $scope.fechai = "";
            $scope.fechat = "";
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

        $scope.obtenerInformacion = function() {
            if ($scope.periodoSel == 1 || $scope.periodoSel == 2) {

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

                    if ($scope.periodoSel == 1) {

                        IndicesService.getTIIE28(registro).then(
                            function(result) {
                                $scope.resultadosBusqueda = result.data.records;
                            },
                            function(err) {
                                toastr.error("No se han podido cargar la información solicitada");
                            }
                        );
                    } else {
                        if ($scope.periodoSel == 2) {

                            IndicesService.getTIIE91(registro).then(
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
            } else {
                toastr.error("Seleccione un período que dese consultar ");
            }
        }

    }
})();