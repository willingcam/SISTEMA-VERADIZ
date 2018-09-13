/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("DolarGetCtrl", ["$scope", "IndicesService", DolarGetCtrl]);

    function DolarGetCtrl($scope, IndicesService) {
        $scope.resultadosBusqueda = {};

        $scope.fechai = "";
        $scope.fechat = "";

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


                IndicesService.getDolar(registro).then(
                    function(result) {
                        $scope.resultadosBusqueda = result.data.records;
                    },
                    function(err) {
                        toastr.error("No se han podido cargar la información solicitada");
                    }
                );

            } else {
                toastr.error("Debe seleccionar una fecha de inicio y de termino para establecer el rango de búsqueda");
            }

        }


    }
})();