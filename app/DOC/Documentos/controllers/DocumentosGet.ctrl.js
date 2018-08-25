/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizDOC");
    app.controller("DocumentosGetCtrl", ["$scope", "DocumentosService", DocumentosGetCtrl]);

    function DocumentosGetCtrl($scope, DocumentosService) {


        $scope.loading = true;

        $scope.clienteActual = "";
        $scope.clienteSeleccionado = "";

        $scope.clientes = {};

        $scope.clientes = function() {
            DocumentosService.getAllClients().then(
                function(result) {
                    $scope.clientes = result.data.records;
                },
                function(err) {

                }
            );
        }

        $scope.documentos = function() {
            DocumentosService.getAll().then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGet = result.data.records;

                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }

        $scope.filtraDocumentos = function() {
            DocumentosService.getByClient($scope.clienteSeleccionado).then(
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

            DocumentosService.deleteById(registro).then(
                function(result) {
                    toastr.success('Documento eliminado exitosamente');
                    $scope.documentos();
                },
                function(err) {
                    toastr.success('Se presento un error al eliminar el documento de la nube');
                }
            );
        }

        $scope.clientes();
        $scope.documentos();



    }

})();