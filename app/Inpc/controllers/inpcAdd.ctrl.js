/*AYUDA:
FooEntitiesService nombre de factory en RolesAdd.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("inpcAddCtrl", ['$scope', 'InpcService', 'globalGet', '$state', '$http', 'AuthService', inpcAddCtrl]);

    function inpcAddCtrl($scope, InpcService, globalGet, $state, $http, AuthService) {

        var API = globalGet.get("api");

        $scope.anio = "";
        $scope.valor = "";


        $scope.anioActual = (new Date()).getFullYear().toString();
        $scope.anios = [{
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
                "id": "2016",
                "descripcion": "2016"
            },
            {
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


        $scope.save = function() {
            if ($scope.anioActual == '' || $scope.anioActual == null || $scope.anioActual == undefined) {
                toastr.error("Debe seleccionar el año");
                return false;
            }
            if ($scope.mesActual == '' || $scope.mesActual == null || $scope.mesActual == undefined) {
                toastr.error("Debe seleccionar el mes");
                return false;
            }
            if ($scope.valor == '' || $scope.valor == null || $scope.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }


            var registro = {
                'anio': $scope.anioActual,
                'mes': $scope.mesActual,
                'valor': $scope.valor
            }

            InpcService.Add(registro).then(
                function(result) {
                    toastr.success("Registro exitoso");
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