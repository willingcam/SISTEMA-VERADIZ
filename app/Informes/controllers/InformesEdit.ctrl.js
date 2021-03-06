﻿/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller("InformesEditCtrl", ['AuthService', '$scope', 'InformesService', 'globalGet', '$state', '$stateParams', '$http', InformesEditCtrl]);

    function InformesEditCtrl(AuthService, $scope, InformesService, globalGet, $state, $stateParams, $http) {

        //Variable API
        var API = globalGet.get("api");

        var id = $stateParams.id;

        $scope.regFile = false;

        $scope.registro = {};


        $scope.descripcion = "";
        $scope.archivo = "";
        $scope.ubicacion = "";
        $scope.urlCompleta = "";

        $scope.documentoEliminado = "";

        $scope.clienteActual = -1;
        $scope.clienteSeleccionado = -1;
        $scope.clientes = {};

        $scope.documentoSeleccionado = -1;
        $scope.tipoActual = -1;
        $scope.tipodocumento = {};

        //Obtene ambito
        InformesService.getById(id).then(
            function(result) {
                // $scope.registro = result.data.records;
                $scope.registro = result.data;
                $scope.clienteActual = $scope.registro.clienteId;
                $scope.clienteSeleccionado = $scope.registro.clienteId;

                $scope.tipoActual = $scope.registro.tipoDocumentoId;
                $scope.documentoSeleccionado = $scope.registro.tipoDocumentoId;

                if ($scope.registro.archivo == "" || $scope.registro.archivo == null) {

                    $scope.archivo = "";
                    $scope.ubicacion = "";

                    $scope.regFile = false;

                } else {
                    $scope.archivo = $scope.registro.archivo;
                    $scope.ubicacion = $scope.registro.ubicacion;

                    $scope.regFile = true;
                }


                $scope.urlCompleta = $scope.ubicacion + $scope.archivo;
            },
            function(err) {
                console.error(err);
            }
        );


        $scope.clientes = function() {
            InformesService.getAllClients().then(
                function(result) {
                    $scope.clientes = result.data.records;
                },
                function(err) {

                }
            );
        }

        $scope.clientes();

        $scope.tiposdocumentos = function() {
            InformesService.getTipoDocumentos().then(
                function(result) {
                    $scope.tipodocumento = result.data.records;
                },
                function(err) {
                    toastr.error('Se presento un error al obtener los tipos de documentos registrados en el sistema');
                }
            );
        }

        $scope.tiposdocumentos();


        //Guardar Cambios
        $scope.update = function() {

            if ($scope.archivo == "") {
                toastr.error("Debe seleccionar un archivo para actualizar el registro ");
                return;
            }

            var registro = {
                'descripcion': $scope.registro.descripcion,
                'archivo': $scope.archivo,
                'ubicacion': $scope.ubicacion,
                'tipoAccesoId': 1,
                'clienteId': $scope.clienteSeleccionado,
                'tipoDocumentoId': $scope.documentoSeleccionado,
                "fechaRegistro": $scope.registro.fechaRegistro,
                "autorId": AuthService.authentication.idUsuario,
                "id": $scope.registro.id
            }

            InformesService.Update(registro).then(
                function(result) {

                    if ($scope.regFile == false) {
                        var registro = {
                            "archivo": $scope.documentoEliminado
                        };

                        InformesService.deleteOnlyDocument(registro).then(
                            function(result) {
                                toastr.success("Archivo eliminado exitosamente ");
                            },
                            function(err) {
                                toastr.error("Se presento un problema al alimnar el archivo ");
                            }
                        );
                    }


                    $state.go("informes");
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        $scope.deleteFile = function() {
            $scope.regFile = false;

            $scope.documentoEliminado = $scope.archivo;

            $scope.archivo = "";
            $scope.ubicacion = "";

            $scope.urlCompleta = $scope.ubicacion + $scope.archivo;

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



        //Guardar Cambios
        $scope.update = function() {

            if ($scope.archivo == "") {
                toastr.error("Debe seleccionar un archivo para actualizar el registro ");
                return;
            }

            var registro = {
                'descripcion': $scope.registro.descripcion,
                'archivo': $scope.archivo,
                'ubicacion': $scope.ubicacion,
                'tipoAccesoId': 1,
                'clienteId': $scope.clienteSeleccionado,
                'tipoDocumentoId': $scope.documentoSeleccionado,
                'comentarios': $scope.registro.comentarios,
                'id': $scope.registro.id
            }

            InformesService.Update(registro).then(
                function(result) {

                    if ($scope.regFile == false) {
                        var registro = {
                            "archivo": $scope.documentoEliminado
                        };

                        InformesService.deleteOnlyDocument(registro).then(
                            function(result) {
                                toastr.success("Archivo eliminado exitosamente ");
                            },
                            function(err) {
                                toastr.error("Se presento un problema al alimnar el archivo ");
                            }
                        );
                    }


                    $state.go("informes");
                },
                function(err) {
                    console.error(err);
                }
            );
        }




        //Guardar Cambios
        $scope.EnviaRevision = function() {
            var registro = {
                "estadodocumento": 2,
                "id": $scope.registro.id
            }
            InformesService.cambioestado(registro).then(
                function(result) {
                    toastr.success("Informe enviado a revisión ");
                    $state.go("informes");
                },
                function(err) {
                    console.error(err);
                }
            );
        }



        $scope.regresar = function() {
            $state.go("informes");
        }



    }
})();