/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizSOC")
        .controller("DocumentosAddCtrl", ['$scope', 'DocumentosService', 'globalGet', '$state', '$http', 'AuthService', DocumentosAddCtrl]);

    function DocumentosAddCtrl($scope, DocumentosService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");


        $scope.descripcion = "";
        $scope.archivo = "";
        $scope.ubicacion = "";


        $scope.clienteSeleccionado = -1;
        $scope.documentoSeleccionado = -1;

        $scope.clientes = {};
        $scope.tipodocumento = {};


        $scope.clientes = function() {
            DocumentosService.getAllClients().then(
                function(result) {
                    $scope.clientes = result.data.records;
                },
                function(err) {
                    toastr.error('Se presento un error al obtener los datos de los clientes VERADIZ');
                }
            );
        }


        $scope.tiposdocumentos = function() {
            DocumentosService.getTipoDocumentos().then(
                function(result) {
                    $scope.tipodocumento = result.data.records;
                },
                function(err) {
                    toastr.error('Se presento un error al obtener los tipos de documentos registrados en el sistema');
                }
            );
        }


        $scope.getFileDetails = function(adjunto) {

            if (adjunto.files.length <= 0) { return false; }

            $scope.files = [];
            $scope.files.push(adjunto.files[0]);

            $scope.ubicacion = "/api_veradiz/Repository/Upload/documentos/";

            var formData = new FormData();
            formData.append("file", adjunto.files[0]);

            var URL = API + "Repository/Upload/uploadDocumentos.php";
            $http.post(URL, formData, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'Process-Data': false }
                })
                .success(function(data) {
                    $scope.archivo = data;
                    toastr.success('Archivo cargado exitosamente en la nube');
                    //alert(data);
                })
                .error(function() {
                    toastr.error('Se presento un error en la carga del archivo a la nube');
                });

        };


        //Agregar documento
        $scope.save = function() {


            if ($scope.documentoSeleccionado == -1) {
                toastr.error("Debe seleccionar un tipo de documento");
                return;
            }

            if ($scope.clienteSeleccionado == -1) {
                toastr.error("Debe seleccionar un cliente");
                return;
            }

            if ($scope.archivo == "") {
                toastr.error("Debe seleccionar el archivo que desea cargar");
                return;
            }

            var registo = {
                'descripcion': $scope.descripcion,
                'archivo': $scope.archivo,
                'ubicacion': $scope.ubicacion,
                'tipoAccesoId': 1,
                'clienteId': $scope.clienteSeleccionado,
                'tipoDocumentoId': $scope.documentoSeleccionado,
                "fechaRegistro": new Date(),
                "autorId": AuthService.authentication.idUsuario,
                "estadodocumento": 3,
                "informedescargado": 0,
                "fechadescarga": new Date()

            }


            DocumentosService.verifyDocument(registo).then(
                function(result) {

                    if (result.data.records != undefined) {
                        toastr.success("Ya existe un documento registrado con el mismo nombre y el mismo cliente y tipo de documento seleccionado");
                    } else {

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

                },
                function(err) {
                    console.error(err);
                }
            );



        }


        $scope.clientes();
        $scope.tiposdocumentos();


    }

})();