/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("ClientesEditCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$stateParams', '$http', "localStorageService", "AuthService", ClientesEditCtrl]);

    function ClientesEditCtrl($scope, UsuariosService, globalGet, $state, $stateParams, $http, localStorageService, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.eliminarImagen = false;

        $scope.archivo = "";
        $scope.ubicacion = "api_veradiz/Repository/Upload/images/";

        $scope.registro = {};

        $scope.urlImagenCompleta = "";

        //Obtene ambito
        UsuariosService.getById(id).then(
            function(result) {
                // $scope.registro = result.data.records;
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
                    AuthService.authentication.foto = $scope.urlImagenCompleta;

                    var authData = localStorageService.get('authorizationData');
                    if (authData) {
                        _authentication.foto = $scope.urlImagenCompleta;
                    }
                    localStorageService.set('authorizationData', authData);
                    $scope.eliminarImagen = false;
                })
                .error(function() {
                    alert("Error");
                });

        };

        //Guardar Cambios
        $scope.update = function() {
            $scope.registro.imagen = $scope.archivo;
            UsuariosService.UpdateContac($scope.registro).then(
                function(result) {
                    $state.go("clientes");
                },
                function(err) {
                    console.error(err);
                }
            );


        }

        $scope.deleteImagen = function() {
            $scope.eliminarImagen = true;
            $scope.urlImagenCompleta = $scope.ubicacion + "empresa.png";
            $scope.archivo = "empresa.png";
            AuthService.authentication.foto = $scope.urlImagenCompleta;
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authData.foto = $scope.urlImagenCompleta;
            }
            localStorageService.set('authorizationData', authData);

        }

        $scope.regresar = function() {
            $state.go("clientes");
        }

    }

})();