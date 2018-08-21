/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizGEN")
        .controller("ServiciosEditCtrl", ['$scope', 'ServiciosService', 'globalGet', '$state', '$stateParams', '$http', ServiciosEditCtrl]);

    function ServiciosEditCtrl($scope, ServiciosService, globalGet, $state, $stateParams, $http) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.eliminarImagen = false;

        $scope.archivo = "";
        $scope.ubicacion = "api_veradiz/Repository/Upload/images/";

        $scope.registro = {};

        $scope.urlImagenCompleta = "";

        //Obtene ambito
        ServiciosService.getById(id).then(
            function(result) {

                $scope.registro = result.data;
                $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.registro.imagen;
                $scope.archivo = $scope.registro.imagen;

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
                    $scope.eliminarImagen = false;
                    //alert(data);
                })
                .error(function() {
                    alert("Error");
                });

        };

        //Guardar Cambios
        $scope.update = function() {
            $scope.registro.imagen = $scope.archivo;
            ServiciosService.Update($scope.registro).then(
                function(result) {
                    $state.go("servicios");
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        $scope.deleteImagen = function() {
            $scope.eliminarImagen = true;
            $scope.urlImagenCompleta = $scope.ubicacion + "servicios1.png";
            $scope.archivo = "servicios1.png";

        }

    }

})();