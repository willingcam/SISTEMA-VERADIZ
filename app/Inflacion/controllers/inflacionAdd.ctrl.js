/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("inflacionAddCtrl", ['$scope', 'InflacionService', 'globalGet', '$state', '$http', 'AuthService', inflacionAddCtrl]);

    function inflacionAddCtrl($scope, InflacionService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.anio = "";
        $scope.valor = "";
        $scope.porcen_mensual="";
        $scope.porcen_acumulada="";
        $scope.porcen_acumvsanioanterior="";
           
        $scope.save = function() {
            if ($scope.anio == '' || $scope.anio == null || $scope.anio == undefined) {
                toastr.error("Debe ingresar el año");
                return false;
            }
            if ($scope.mes == '' || $scope.mes == null || $scope.mes == undefined) {
                toastr.error("Debe ingresar el mes");
                return false;
            }
            if ($scope.valor == '' || $scope.valor == null || $scope.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }
            if ($scope.porcen_mensual == '' || $scope.porcen_mensual == null || $scope.porcen_mensual == undefined) {
                toastr.error("Debe ingresar el porcentaje mensual");
                return false;
            }
            if ($scope.porcen_acumulada == '' || $scope.porcen_acumulada == null || $scope.porcen_acumulada == undefined) {
                toastr.error("Debe ingresar el acumulado mensual");
                return false;
            }
            if ($scope.porcen_acumvsanioanterior == '' || $scope.porcen_acumvsanioanterior == null || $scope.porcen_acumvsanioanterior == undefined) {
                toastr.error("Debe ingresar la diferencia del acumulado vs año anterior");
                return false;
            }
            

            var registro = {
                'anio': $scope.anio,
                'mes': $scope.mes,
                'valor': $scope.valor,
                'porcen_mensual': $scope.porcen_mensual,
                'porcen_acumulada': $scope.porcen_acumulada,
                'porcen_acumvsanioanterior': $scope.porcen_acumvsanioanterior
            }

            InflacionService.Add(registro).then(
                function(result) {
                    toastr.success("Registro exitoso");
                    $state.go("inflacion");
                },
                function(err) {
                    console.error(err);
                }
            );
        }


        $scope.regresar = function() {
            $state.go("inflacion");
        }       


    }

})();