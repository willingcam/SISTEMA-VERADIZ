/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizDOC")
        //.controller("UsuariosAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', UsuariosAddCtrl]);
        .controller("DocumentosAddCtrl", ['$scope', 'DocumentosService', 'globalGet', '$state', '$http', DocumentosAddCtrl]);

    function DocumentosAddCtrl($scope, DocumentosService, globalGet, $state, $http) {

        var API = globalGet.get("api");


        $scope.descripcion = "";
        $scope.archivo = "";
        $scope.ubicacion = "";


        $scope.clienteSeleccionado = -1;

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


        $scope.tipoAccesoId = "-1";

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
            $scope.ubicacion = "/api_veradiz/Repository/Upload/images/";

            var formData = new FormData();
            formData.append("file", adjunto.files[0]);

            var URL = API + "Repository/Upload/upload.php";
            $http.post(URL, formData, {
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

            if ($scope.tipoAccesoId == -1) {
                toast.error("Debe seleccionar el tipo de acceso del documento");
                return;
            }

            if ($scope.clienteSeleccionado == -1) {
                toast.error("Debe seleccionar un cliente");
                return;
            }

            if ($scope.archivo == "") {
                toast.error("Debe seleccionar el archivo que desea cargar");
                return;
            }

            var registo = {
                'descripcion': $scope.descripcion,
                'archivo': $scope.archivo,
                'ubicacion': $scope.ubicacion,
                'tipoAccesoId': $scope.tipoAccesoId,
                'clienteId': $scope.clienteSeleccionado,
                'tipoDocumentoId': 1
            }


            DocumentosService.Add(registo).then(
                function(result) {

                    toastr.success("Documento registrado exitosamente");
                    $state.go("documentos");
                },
                function(err) {
                    console.error(err);
                }
            );
        }


        $scope.clientes();



    }

})();