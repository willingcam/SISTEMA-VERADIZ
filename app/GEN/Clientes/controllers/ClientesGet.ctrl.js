/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizGEN");
    app.controller("ClientesGetCtrl", ["$scope", "UsuariosService", ClientesGetCtrl]);

    function ClientesGetCtrl($scope, UsuariosService) {

        //Variables de carga
        $scope.loading = true;


        //Obtener los servicios de autenticacion
        //$scope.authentication = AuthService.authentication;
        //obtener registros

        $scope.cargaDatos = function() {
            UsuariosService.getAllClients().then(
                function(result) {

                    $scope.loading = false;
                    $scope.usuariosGet = result.data.records;

                },
                function(err) {
                    toastr.error("No se han podido cargar la información de clientes que tenemos registrada");
                }
            );
        }


        $scope.updateState = function(obj) {
            obj.activo = 0;

            var registro = {
                'id': obj.id,
                'activo': 0
            }

            UsuariosService.updateState(registro).then(
                function(result) {
                    $scope.cargaDatos();
                },
                function(err) {
                    toastr.error("Se actualizaron los registros del personal");
                }
            );
        }

        $scope.cargaDatos();

    }

})();