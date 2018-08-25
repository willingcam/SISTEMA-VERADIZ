/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        //.controller("UsuariosAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', UsuariosAddCtrl]);
        .controller("ClientesAddCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$http', ClientesAddCtrl]);

    function ClientesAddCtrl($scope, UsuariosService, globalGet, $state, $http) {

        var API = globalGet.get("api");

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

            if ($scope.archivo == "") {
                $scope.archivo = "empresa.png";
            }

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
                'tipoUsuarioId': 2,
                'rolID': 4,
                'rol': 'Cliente',
                'contacto': $scope.contacto

            }

            UsuariosService.Add(registo).then(
                function(result) {

                    toastr.success("Cliente registrado exitosamente");
                    $state.go("clientes");
                },
                function(err) {
                    console.error(err);
                }
            );
        }




    }

})();