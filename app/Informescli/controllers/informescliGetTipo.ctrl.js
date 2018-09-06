/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("informescliGetTipoCtrl", ['$scope', 'InformesService', 'AuthService','$stateParams',  informescliGetTipoCtrl]);

    function informescliGetTipoCtrl($scope, InformesService, AuthService,$stateParams) {

        $scope.loading = true;

        var id = $stateParams.id;

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