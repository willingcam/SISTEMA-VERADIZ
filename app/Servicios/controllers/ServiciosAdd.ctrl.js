/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("ServiciosAddCtrl", ['$scope', 'ServiciosService', 'globalGet', '$state', '$http', ServiciosAddCtrl]);

    function ServiciosAddCtrl($scope, ServiciosService, globalGet, $state, $http) {

        var API = globalGet.get("api");

        $scope.servicio = "";
        $scope.descripcion = "";


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
                $scope.archivo = "servicios1.png";
            }

            var registro = {
                'servicio': $scope.servicio,
                'descripcion': $scope.descripcion,
                'imagen': $scope.archivo,
                'ubicacion_imagen': $scope.ubicacion,
                'activo': 1
            }



            ServiciosService.Add(registro).then(
                function(result) {
                    toastr.success("Servicio registrado exitosamente");
                    $state.go("servicios");
                },
                function(err) {
                    console.error(err);
                }
            );
        }




    }

})();