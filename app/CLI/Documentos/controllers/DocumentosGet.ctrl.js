/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizCLI");
    app.controller("DocumentosGetCtrl", ["$scope", "DocumentosService", "AuthService", DocumentosGetCtrl]);

    function DocumentosGetCtrl($scope, DocumentosService, AuthService) {


        $scope.loading = true;



        $scope.documentos = function() {
            DocumentosService.getAllOnlyMisDocumentsClient(AuthService.authentication.idUsuario).then(
                function(result) {
                    $scope.loading = false;
                    $scope.documentosGet = result.data.records;


                },
                function(err) {
                    toastr.error("Se presento un error en la carga de los datos");
                }
            );
        }



        $scope.documentos();



    }

})();