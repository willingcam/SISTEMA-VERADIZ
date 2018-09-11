/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("NoticiasEditCtrl", ['$scope', 'NoticiasService', 'globalGet', '$state', '$stateParams', '$http', 'AuthService', NoticiasEditCtrl]);

    function NoticiasEditCtrl($scope, NoticiasService, globalGet, $state, $stateParams, $http, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.archivo = "";
        $scope.ubicacion = "";

        $scope.registro = {};


        //$scope.urlImagenCompleta = "";

        //Obtene ambito
        NoticiasService.getById(id).then(
            function(result) {
                // $scope.registro = result.data.records;
                $scope.registro = result.data;
                //  $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.registro.imagen;

            },
            function(err) {
                console.error(err);
            }
        );


        $scope.getFileDetails = function(adjunto) {

            if (adjunto.files.length <= 0) { return false; }

            $scope.files = [];
            $scope.files.push(adjunto.files[0]);


            $scope.archivo = adjunto.files[0].name;
            $scope.ubicacion = "api_veradiz/Repository/Upload/images/";

            var formData = new FormData();
            formData.append("file", adjunto.files[0]);

            var URL = API + "Repository/Upload/upload.php";
            $http.post(URL, formData, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'Process-Data': false }
                })
                .success(function(data) {

                    toastr.success(data);
                    $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.archivo;

                })
                .error(function() {
                    alert("Error");
                });

        };

        //Guardar Cambios
        $scope.update = function() {

            if ($scope.registro.titulo == '' || $scope.registro.titulo == null || $scope.registro.titulo == undefined) {
                toastr.error("Debe ingresar el titulo de la noticia");
                return false;
            }
            if ($scope.registro.subtitulo == '' || $scope.registro.subtitulo == null || $scope.registro.subtitulo == undefined) {
                toastr.error("Debe ingresar el subtitulo de la noticia");
                return false;
            }
            if ($scope.registro.descripcion == '' || $scope.registro.descripcion == null || $scope.registro.descripcion == undefined) {
                toastr.error("Debe ingresar el contenido de la noticia");
                return false;
            }
            NoticiasService.Update($scope.registro).then(
                function(result) {
                    $state.go("noticias");
                },
                function(err) {
                    console.error(err);
                }
            );


        }

        $scope.regresar = function() {
            $state.go("noticias");
    }

    }
})();