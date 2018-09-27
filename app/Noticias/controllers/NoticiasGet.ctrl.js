/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("NoticiasGetCtrl", ["$scope", "NoticiasService", NoticiasGetCtrl]);

    function NoticiasGetCtrl($scope, NoticiasService) {

        //Variables de carga
        $scope.loading = true;


        //Obtener los servicios de autenticacion
        //$scope.authentication = AuthService.authentication;
        //obtener registros

        $scope.cargaDatos = function() {
            NoticiasService.getAll().then(
                function(result) {

                    $scope.loading = false;
                    $scope.noticiasGet = result.data.records;


                },
                function(err) {
                    toastr.error("No se han podido cargar la información de noticias que tenemos registradas");
                }
            );
        }


        $scope.updateState = function(obj) {
            obj.activo = 0;

            var registro = {
                'id': obj.id,
                'activo': 0
            }

            NoticiasService.updateState(registro).then(
                function(result) {
                    $scope.cargaDatos();
                },
                function(err) {
                    toastr.error("Se actualizaron las noticias registradas");
                }
            );
        }

        $scope.cargaDatos();

    }

})();