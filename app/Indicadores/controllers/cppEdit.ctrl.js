/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("cppEditCtrl", ['$scope', 'IndicesService', 'globalGet', '$state', '$stateParams', '$http', 'AuthService', cppEditCtrl]);

    function cppEditCtrl($scope, IndicesService, globalGet, $state, $stateParams, $http, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.registro = {};



        IndicesService.getCPPById(id).then(
            function(result) {
                $scope.registro = result.data;
            },
            function(err) {
                console.error(err);
            }
        );

        //Guardar Cambios
        $scope.update = function() {

            if ($scope.registro.valor == '' || $scope.registro.valor == null || $scope.registro.valor == undefined) {
                toastr.error("Debe ingresar el valor del costo porcentual");
                return false;
            }

            IndicesService.updateCPP($scope.registro).then(
                function(result) {
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