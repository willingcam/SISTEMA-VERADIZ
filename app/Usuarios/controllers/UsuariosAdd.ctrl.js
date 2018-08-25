/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        //.controller("UsuariosAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', UsuariosAddCtrl]);
        .controller("UsuariosAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', UsuariosAddCtrl]);

    function UsuariosAddCtrl($scope, UsuariosService, globalGet, $state, $http) {

        var API = globalGet.get("api");


        $scope.roles = {};
        $scope.rolseleciconado = -1;

        $scope.nombre = "";
        $scope.correo = "";
        $scope.cuenta = "";
        $scope.claveacceso = "";

        $scope.telefono = "";
        $scope.extension = "";
        $scope.celular = "";
        $scope.imagen = "";

        $scope.puesto = "";
        $scope.archivo = "";
        $scope.ubicacion = "api_veradiz/Repository/Upload/images/";

        $scope.getRoles = function() {
            UsuariosService.getAllRoles().then(
                function(result) {
                    $scope.roles = result.data.records;
                    $scope.roles.splice(3, 1);

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

                })
                .error(function() {
                    alert("Error");
                });
        };

        $scope.save = function() {

            if ($scope.archivo == "") {
                $scope.archivo = "user.png";
            }

            if ($scope.rolseleciconado == -1) {
                toastr.error("Debe seleccionar el rol del usuario");
                return;
            }

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


            var cadena = $scope.correo.split('@');
            var cuentaUsuario = cadena[0];



            var registo = {
                'nombre': $scope.nombre,
                'correo': $scope.correo,
                'usuario': cuentaUsuario,
                'claveacceso': 'test',
                'telefono': $scope.telefono,
                'celular': $scope.celular,
                'extension': $scope.extension,
                'puesto': $scope.puesto,
                'imagen': $scope.archivo,
                'ubicacion_imagen': $scope.ubicacion,
                'activo': 1,
                'tipoUsuarioId': 1,
                'rolID': $scope.rolseleciconado,
                'rol': $scope.nombreRol,
                'contacto': ''
            };


            UsuariosService.Add(registo).then(
                function(result) {

                    toastr.success("Usuario registrado exitosamente");
                    $state.go("usuarios");
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        $scope.getRoles();
    }
})();