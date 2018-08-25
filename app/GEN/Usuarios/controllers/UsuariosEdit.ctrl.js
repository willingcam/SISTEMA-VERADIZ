/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizGEN")
        .controller("UsuariosEditCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$stateParams', '$http', "localStorageService", "AuthService", UsuariosEditCtrl]);

    function UsuariosEditCtrl($scope, UsuariosService, globalGet, $state, $stateParams, $http, localStorageService, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.roles = {};
        $scope.rolseleciconado = -1;
        $scope.rolActual = -1;

        $scope.eliminarImagen = false;

        $scope.archivo = "";
        $scope.ubicacion = "api_veradiz/Repository/Upload/images/";

        $scope.registro = {};

        $scope.urlImagenCompleta = "";


        $scope.getRoles = function() {
            UsuariosService.getAllRoles().then(
                function(result) {
                    $scope.roles = result.data.records;

                },
                function(err) {
                    console.error(err);
                }
            );
        }

        //Obtene ambito
        UsuariosService.getById(id).then(
            function(result) {
                // $scope.registro = result.data.records;
                $scope.registro = result.data;
                $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.registro.imagen;
                $scope.archivo = $scope.registro.imagen;

                $scope.rolseleciconado = $scope.registro.rolID;
                $scope.rolActual = $scope.registro.rolID;



            },
            function(err) {
                console.error(err);
            }
        );

        $scope.getRoles = function() {
            UsuariosService.getAllRoles().then(
                function(result) {
                    $scope.roles = result.data.records;

                },
                function(err) {
                    console.error(err);
                }
            );
        }

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
                    AuthService.authentication.foto = $scope.urlImagenCompleta;

                    var authData = localStorageService.get('authorizationData');
                    if (authData) {
                        _authentication.foto = $scope.urlImagenCompleta;
                    }
                    localStorageService.set('authorizationData', authData);
                    $scope.eliminarImagen = false;
                    //alert(data);
                })
                .error(function() {

                });

        };

        //Guardar Cambios
        $scope.update = function() {
            $scope.registro.imagen = $scope.archivo;
            $scope.registro.rolID = $scope.rolseleciconado;

            $scope.nombreRol = "";

            if ($scope.rolseleciconado == 1)
                $scope.nombreRol = "Administrador";

            if ($scope.rolseleciconado == 2)
                $scope.nombreRol = "Socio";

            if ($scope.rolseleciconado == 3)
                $scope.nombreRol = "Empleado";

            if ($scope.rolseleciconado == 4)
                $scope.nombreRol = "Cliente";

            if ($scope.rolseleciconado == 5)
                $scope.nombreRol = "Tesorería";

            $scope.registro.rol = $scope.nombreRol;


            UsuariosService.Update($scope.registro).then(
                function(result) {

                    $state.go("usuarios");
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        $scope.deleteImagen = function() {
            $scope.eliminarImagen = true;
            $scope.urlImagenCompleta = $scope.ubicacion + "user.png";
            $scope.archivo = "user.png";

            AuthService.authentication.foto = $scope.urlImagenCompleta;
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authData.foto = $scope.urlImagenCompleta;
            }
            localStorageService.set('authorizationData', authData);

        }

        $scope.getRoles();

    }

})();