/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("inflacionGetCtrl", ["$scope", "InflacionService", inflacionGetCtrl]);

    function inflacionGetCtrl($scope, InflacionService) {

        //Variables de carga
        $scope.loading = true;


        //Obtener los servicios de autenticacion
        //$scope.authentication = AuthService.authentication;
        //obtener registros

        $scope.cargaDatos = function() {
            InflacionService.getAll().then(
                function(result) {

                    $scope.loading = false;
                    $scope.inflacionGet = result.data.records;

                },
                function(err) {
                    toastr.error("No se han podido cargar la información de noticias que tenemos registradas");
                }
            );
        }

        $scope.eliminarInflacion = function(obj) {
            var registro = {
                'id': obj.id
            }

            InflacionService.Delete(registro).then(
                function(result) {
                    $scope.cargaDatos();
                },
                function(err) {
                    toastr.error("Hubó problema en la actualización de los registros");
                }
            );
        }


        $scope.cargaDatos();

    }

})();