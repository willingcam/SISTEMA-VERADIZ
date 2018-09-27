/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("informesCliGetTipoCtrl", ['$scope', 'InformesService', 'AuthService', '$stateParams', informesCliGetTipoCtrl]);

    function informesCliGetTipoCtrl($scope, InformesService, AuthService, $stateParams) {

        $scope.loading = true;

        var id = $stateParams.id;

        $scope.documentos = function() {
            var registro = {
                "id": AuthService.authentication.idUsuario,
                "tipo": id,
            };
            InformesService.getDocumentosClienteYaPublicadosTipo(registro).then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGet = result.data.records;
                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }


        $scope.descargaYactualizaFechaDescarga = function(id, urlCompleta) {
            var registro = {
                "id": id,
                "fechadescarga": new Date(),
                "informedescargado": 1
            };


            InformesService.descargado(registro).then(
                function(result) {
                    // descarga de archivo
                    var file_path = urlCompleta;
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    //
                    $scope.documentos();
                },
                function(err) {

                }
            );
        }


        $scope.documentos();

    }

})();