/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizCLI");
    app.controller("DocumentosGetCtrl", ["$scope", "DocumentosService", DocumentosGetCtrl]);

    function DocumentosGetCtrl($scope, DocumentosService) {

        //Variables de carga
        $scope.loading = true;
        //Obtener los servicios de autenticacion
        //$scope.authentication = AuthService.authentication;
        //obtener registros


        DocumentosService.getAll().then(
            function(result) {

                $scope.loading = false;
                $scope.documentosGet = result.data.records;


            },
            function(err) {
                toastr.error("No se han podido cargar los roles registrados en el sistema");
            }
        );



    }

})();