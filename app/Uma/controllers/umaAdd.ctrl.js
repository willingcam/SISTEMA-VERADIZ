/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("umaAddCtrl", ['$scope', 'UmaService', 'globalGet', '$state', '$http', 'AuthService', umaAddCtrl]);

    function umaAddCtrl($scope, UmaService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.anio = "";
        $scope.valor = "";
           
        $scope.save = function() {
            if ($scope.anio == '' || $scope.anio == null || $scope.anio == undefined) {
                toastr.error("Debe ingresar el año");
                return false;
            }
            if ($scope.valor == '' || $scope.valor == null || $scope.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }
            

            var registro = {
                'anio': $scope.anio,
                'valor': $scope.valor
            }

            UmaService.Add(registro).then(
                function(result) {
                    toastr.success("Registro exitoso");
                    $state.go("uma");
                },
                function(err) {
                    console.error(err);
                }
            );
        }


        $scope.regresar = function() {
            $state.go("uma");
        }       


    }

})();