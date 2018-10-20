/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("InformesGetCtrl", ["$scope", "InformesService", 'AuthService', InformesGetCtrl]);

    function InformesGetCtrl($scope, InformesService, AuthService) {


        $scope.loading = true;

        $scope.clienteActual = "";
        $scope.clienteSeleccionado = "";

        $scope.clientes = {};

        $scope.clientes = function() {
            InformesService.getAllClients().then(
                function(result) {
                    $scope.clientes = result.data.records;
                },
                function(err) {

                }
            );
        }

        $scope.documentos = function() {
            InformesService.getAllDocumentsByAuthor(AuthService.authentication.idUsuario).then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGet = result.data.records;
                    console.log(result);
                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }

        $scope.filtraDocumentos = function() {
            InformesService.getByClient($scope.clienteSeleccionado).then(
                function(result) {
                    $scope.documentosGet = result.data.records;

                },
                function(err) {

                }
            );
        }

        $scope.eliminarDocumento = function(id, archivo) {
            var registro = {
                "id": id,
                "archivo": archivo
            };

            InformesService.deleteById(registro).then(
                function(result) {
                    toastr.success('Documento eliminado exitosamente');
                    $scope.documentos();
                },
                function(err) {
                    toastr.success('Se presento un error al eliminar el documento de la nube');
                }
            );
        }

        $scope.descargaDoc = function(url) {
            //window.open(url,"_blank");
            // var link=document.createElement('a');
            // link.href = url;
            // link.download = url.substr(url.lastIndexOf('/') + 1);
            // link.click();
            var file_path = url;
            var a = document.createElement('A');
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        $scope.clientes();
        $scope.documentos();



    }

})();