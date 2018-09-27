/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller("cppAddCtrl", ['$scope', 'IndicesService', 'globalGet', '$state', '$http', 'AuthService', cppAddCtrl]);

    function cppAddCtrl($scope, IndicesService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.valor = "";
        $scope.fecha = "";

        $scope.save = function() {

            if ($scope.valor == '' || $scope.valor == null || $scope.valor == undefined) {
                toastr.error("Debe ingresar el valor del costo porcentual");
                return false;
            }

            var registro = {
                'valor': $scope.valor,
                'fecha': new Date()
            }

            IndicesService.AddCPP(registro).then(
                function(result) {
                    toastr.success("valor registrado exitosamente");
                    $state.go("cpp");
                },
                function(err) {
                    console.error(err);
                }
            );
        }


        $scope.regresar = function() {
            $state.go("cpp");
        }


    }
})();