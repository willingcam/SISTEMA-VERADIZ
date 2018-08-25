/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizCLI");
    app.controller("ReportesGetCtrl", ["$scope", "DocumentosService", ReportesGetCtrl]);

    function ReportesGetCtrl($scope, DocumentosService) {

        //Variables de carga
        $scope.loading = true;
        //Obtener los servicios de autenticacion
        //$scope.authentication = AuthService.authentication;
        //obtener registros

        $scope.clienteActual = "";
        $scope.clienteSeleccionado = "";

        $scope.clientes = [{
                "id": "1",
                "descripcion": "NADRO"
            },
            {
                "id": "2",
                "descripcion": "Colegio Williams"
            },
            {
                "id": "3",
                "descripcion": "CeMIESol"
            },
            {
                "id": "4",
                "descripcion": "hamsa"
            },
            {
                "id": "5",
                "descripcion": "farmatodo"
            }
        ];



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