/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("InformesSocGetCtrl", ["$scope", "InformesService", "AuthService", "DTOptionsBuilder", "DTColumnDefBuilder", InformesSocGetCtrl]);

    function InformesSocGetCtrl($scope, InformesService, AuthService, DTOptionsBuilder, DTColumnDefBuilder) {


        $scope.loading = true;

        $scope.clienteActual = "";
        $scope.clienteSeleccionado = "";

        $scope.clientes = {};

        $scope.clientes = function() {
            InformesService.getOnlyMyClient(AuthService.authentication.idUsuario).then(
                function(result) {
                    $scope.clientes = result.data.records;
                },
                function(err) {

                }
            );
        }

        $scope.documentos = function() {
            InformesService.getAllMyClientsDocuments(AuthService.authentication.idUsuario).then(
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

            var registro = {
                "empleado": AuthService.authentication.idUsuario,
                "cliente": $scope.clienteSeleccionado,
            };

            InformesService.getAllMyDocumentsByClient(registro).then(
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

        $scope.clientes();
        $scope.documentos();


        //paginado, filtros y demas cosas de un estado del Datatable
        $scope.paramsDT = JSON.parse(localStorage.getItem('documentosGet' + window.location.pathname)); //Recuperamos los parametros de filtrado en el DT
        if ($scope.paramsDT == null) {
            $scope.paramsDT = {}; //Puede que sean nulos, en dado caso se mostrara la pagina 1
            $scope.paramsDT.displayStart = 0;
        }

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('stateSaveCallback', stateSaveCallback)
            .withOption('stateLoadCallback', stateLoadCallback)
            .withOption('displayStart', $scope.paramsDT.displayStart);
        function stateSaveCallback(settings, data) {
            var stado = $('#documentosGet').DataTable().state();
            localStorage.setItem('documentosGet' + window.location.pathname, JSON.stringify(stado))
    }

        function stateLoadCallback(settings) {
            if ($scope.paramsDT != null) {
                return $scope.paramsDT;
            } else {
                return JSON.parse(localStorage.getItem('documentosGet' + window.location.pathname))
            }
        }
    }
})();