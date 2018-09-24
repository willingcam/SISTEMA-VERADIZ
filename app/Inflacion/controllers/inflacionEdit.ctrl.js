/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function () {
    "use strict";


    angular
        .module("veradiz")
        .controller("inflacionEditCtrl", ['$scope', 'InflacionService', 'globalGet', '$state', '$stateParams', '$http', 'AuthService', inflacionEditCtrl]);

    function inflacionEditCtrl($scope, InflacionService, globalGet, $state, $stateParams, $http, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;

        $scope.archivo = "";
        $scope.ubicacion = "";

        $scope.registro = {};


        //$scope.urlImagenCompleta = "";

        //Obtene ambito
        InflacionService.getById(id).then(
            function (result) {
                // $scope.registro = result.data.records;
                $scope.registro = result.data;
                $scope.registro.anio = Number($scope.registro.anio);
                $scope.registro.mes = Number($scope.registro.mes);
                $scope.registro.valor = Number($scope.registro.valor);

                //  $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.registro.imagen;

            },
            function (err) {
                console.error(err);
            }
        );


        //Guardar Cambios
        $scope.update = function () {

            if ($scope.registro.anio == '' || $scope.registro.anio == null || $scope.registro.anio == undefined) {
                toastr.error("Debe ingresar año del salario mínimo");
                return false;
            }
            if ($scope.registro.valor == '' || $scope.registro.valor == null || $scope.registro.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }

            InflacionService.Update($scope.registro).then(
                function (result) {
                    $state.go("inflacion");
                },
                function (err) {
                    console.error(err);
                }
            );


        }

        $scope.regresar = function () {
            $state.go("inflacion");
        }

    }
})();