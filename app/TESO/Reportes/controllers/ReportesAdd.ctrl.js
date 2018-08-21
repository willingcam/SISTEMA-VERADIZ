/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizTESO")
        //.controller("UsuariosAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', UsuariosAddCtrl]);
        .controller("ReportesAddCtrl", ['$scope', 'DocumentosService', 'globalGet', '$state', '$http', ReportesAddCtrl]);

    function ReportesAddCtrl($scope, DocumentosService, globalGet, $state, $http) {

        var API = globalGet.get("api");


        $scope.descripcion = "";
        $scope.archivo = "";
        $scope.ubicacion = "";

        $scope.clienteActual = "";
        $scope.clienteId = "";

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


        $scope.tipoAccesoActual = "1";
        $scope.tipoAccesoId = "";

        $scope.TiposAccesos = [{
                "id": "1",
                "descripcion": "Público"
            },
            {
                "id": "2",
                "descripcion": "Privado"
            }
        ];


        $scope.getFileDetails = function(adjunto) {

            if (adjunto.files.length <= 0) { return false; }

            $scope.files = [];
            $scope.files.push(adjunto.files[0]);


            $scope.archivo = adjunto.files[0].name;
            $scope.ubicacion = "/Repository/Upload/images/";

            var formData = new FormData();
            formData.append("file", adjunto.files[0]);

            $http.post("http://localhost/api_veradiz/Repository/Upload/upload.php", formData, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'Process-Data': false }
                })
                .success(function(data) {

                    toastr.success(data);
                    //alert(data);
                })
                .error(function() {
                    alert("Error");
                });

        };


        //Agregar documento
        $scope.save = function() {

            var registo = {
                'descripcion': $scope.descripcion,
                'archivo': $scope.archivo,
                'ubicacion': $scope.ubicacion,
                'tipoAccesoId': $scope.tipoAccesoId,
                'clienteId': $scope.clienteId,
                'tipoDocumentoId': "1"
            }


            DocumentosService.Add(registo).then(
                function(result) {

                    toastr.success("Reporte registrado exitosamente");
                    $state.go("reportes");
                },
                function(err) {
                    console.error(err);
                }
            );
        }




    }

})();