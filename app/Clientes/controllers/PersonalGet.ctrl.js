/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("PersonalGetCtrl", ["$scope", "$state", "$stateParams", "$uibModalInstance", "UsuariosService", PersonalGetCtrl]);

    function PersonalGetCtrl($scope, $state, $stateParams, $uibModalInstance, UsuariosService) {

        //Variables de carga

        $scope.empleados = {};
        $scope.empleadoSelect = {};

        $scope.cargaDatos = function() {
            UsuariosService.getAllSocios().then(
                function(result) {
                    $scope.empleados = result.data.records;
                },
                function(err) {
                    toastr.error("No se han podido cargar la información de clientes que tenemos registrada");
                }
            );
        }

        $scope.cargaDatos();


        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.ok = function() {
            $scope.empleados = $scope.empleadoSelect.emp;
            $uibModalInstance.close($scope.empleados);
        }

    }

})();