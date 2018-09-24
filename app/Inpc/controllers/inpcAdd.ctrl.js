/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("inpcAddCtrl", ['$scope', 'InpcService', 'globalGet', '$state', '$http', 'AuthService', inpcAddCtrl]);

    function inpcAddCtrl($scope, InpcService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.anio = "";
        $scope.valor = "";
           
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
            

            var registro = {
                'anio': $scope.anio,
                'mes': $scope.mes,
                'valor': $scope.valor
            }

            InpcService.Add(registro).then(
                function(result) {
                    toastr.success("Registro exitoso");
                    $state.go("inpc");
                },
                function(err) {
                    console.error(err);
                }
            );
        }


        $scope.regresar = function() {
            $state.go("inpc");
        }       


    }

})();