/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("inpcEditCtrl", ['$scope', 'InpcService', 'globalGet', '$state', '$stateParams', '$http', 'AuthService', inpcEditCtrl]);

    function inpcEditCtrl($scope, InpcService, globalGet, $state, $stateParams, $http, AuthService) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;


        $scope.anioActual = (new Date()).getFullYear().toString();
        $scope.anios = [{
                "id": "2016",
                "descripcion": "2016"
            },
            {
                "id": "2017",
                "descripcion": "2017"
            },
            {
                "id": "2018",
                "descripcion": "2018"
            },
            {
                "id": "2019",
                "descripcion": "2019"
            },
            {
                "id": "2020",
                "descripcion": "2020"
            },
            {
                "id": "2021",
                "descripcion": "2021"
            },
            {
                "id": "2022",
                "descripcion": "2022"
            },
            {
                "id": "2023",
                "descripcion": "2023"
            },
            {
                "id": "2024",
                "descripcion": "2024"
            },
            {
                "id": "2025",
                "descripcion": "2025"
            },
            {
                "id": "2026",
                "descripcion": "2026"
            },
            {
                "id": "2027",
                "descripcion": "2027"
            },
            {
                "id": "2028",
                "descripcion": "2028"
            },
            {
                "id": "2029",
                "descripcion": "2029"
            },
            {
                "id": "2030",
                "descripcion": "2030"
            }

        ];


        $scope.mesActual = ((new Date()).getMonth() + 1).toString();
        $scope.meses = [{
                "id": "1",
                "descripcion": "Enero"
            },
            {
                "id": "2",
                "descripcion": "Febrero"
            },
            {
                "id": "3",
                "descripcion": "Marzo"
            },
            {
                "id": "4",
                "descripcion": "Abril"
            },
            {
                "id": "5",
                "descripcion": "Mayo"
            },
            {
                "id": "6",
                "descripcion": "Junio"
            },
            {
                "id": "7",
                "descripcion": "Julio"
            },
            {
                "id": "8",
                "descripcion": "Agosto"
            },
            {
                "id": "9",
                "descripcion": "Septiembre"
            },
            {
                "id": "10",
                "descripcion": "Octubre"
            },
            {
                "id": "11",
                "descripcion": "Noviembre"
            },
            {
                "id": "12",
                "descripcion": "Diciembre"
            }


        ];


        $scope.registro = {};



        InpcService.getById(id).then(
            function(result) {

                $scope.registro = result.data;
                $scope.registro.anioActual = $scope.registro.anio.toString();
                $scope.registro.mesActual = $scope.registro.mes.toString();
                $scope.registro.valor = Number($scope.registro.valor);

            },
            function(err) {
                console.error(err);
            }
        );


        //Guardar Cambios
        $scope.update = function() {

            if ($scope.registro.anio == '' || $scope.registro.anio == null || $scope.registro.anio == undefined) {
                toastr.error("Debe ingresar año del salario mínimo");
                return false;
            }
            if ($scope.registro.valor == '' || $scope.registro.valor == null || $scope.registro.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }

            InpcService.Update($scope.registro).then(
                function(result) {
                    $state.go("inpc");
                },
                function(err) {
                    console.error(err);
                }
            );


        }

        $scope.regresar = function() {
            $state.go("inpc");
        }

    }
})();