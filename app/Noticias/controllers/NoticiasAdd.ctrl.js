/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("NoticiasAddCtrl", ['$scope', 'NoticiasService', 'globalGet', '$state', '$http', 'AuthService', NoticiasAddCtrl]);

    function NoticiasAddCtrl($scope, NoticiasService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.titulo = "";
        $scope.subtitulo = "";
        $scope.descripcion = "";
        $scope.fecha = "";
        $scope.url_referencia = "";


        $scope.archivo = "";
        $scope.ubicacion = "";

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
                    //alert(data);
                })
                .error(function() {
                    alert("Error");
                });

        };

        $scope.save = function() {
            if ($scope.titulo == '' || $scope.titulo == null || $scope.titulo == undefined) {
                toastr.error("Debe ingresar el titulo de la noticia");
                return false;
            }
            if ($scope.subtitulo == '' || $scope.subtitulo == null || $scope.subtitulo == undefined) {
                toastr.error("Debe ingresar el subtitulo de la noticia");
                return false;
            }
            if ($scope.descripcion == '' || $scope.descripcion == null || $scope.descripcion == undefined) {
                toastr.error("Debe ingresar el contenido de la noticia");
                return false;
            }

            var registro = {
                'titulo': $scope.titulo,
                'subtitulo': $scope.subtitulo,
                'descripcion': $scope.descripcion,
                'fecha': new Date(),
                'url_referencia': $scope.url,
                'imagen': "",
                'ubicacion_imagen': "",
                'activo': 1,
                "autorId": AuthService.authentication.idUsuario
            }


            NoticiasService.Add(registro).then(
                function(result) {
                    toastr.success("Noticia registrada exitosamente");
                    $state.go("noticias");
                },
                function(err) {
                    console.error(err);
                }
            );
        }




    }

})();