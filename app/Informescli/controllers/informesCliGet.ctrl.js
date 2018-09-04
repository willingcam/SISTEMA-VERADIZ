/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("InformesCliGetCtrl", ["$scope", "InformesService", "AuthService", InformesCliGetCtrl]);

    function InformesCliGetCtrl($scope, InformesService, AuthService) {

        $scope.loading = true;

        $scope.documentos = function() {
            InformesService.getDocumentosClienteYaPublicados(AuthService.authentication.idUsuario).then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGet = result.data.records;
                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }

        $scope.documentos = function() {
            InformesService.getDocumentosClienteYaPublicadosTotalNuevos(AuthService.authentication.idUsuario).then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGetContadores = result.data.records;
                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }

        


        $scope.actualizaFechaDescarga = function(id) {
            var registro = {
                "id": id,
                "fechadescarga": new Date(),
                "informedescargado": 1
            };


            InformesService.descargado(registro).then(
                function(result) {
                    console.log(result);
                },
                function(err) {

                }
            );
        }


        $scope.documentos();

    }

})();