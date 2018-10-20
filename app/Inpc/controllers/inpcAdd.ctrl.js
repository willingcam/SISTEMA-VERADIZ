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

        $scope.valorAnioAnterior = {};
        $scope.valorMesAnterior = {};
        $scope.valorMismoMesAAnterior = {};

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



        $scope.valoresInflacionAnteriores = function() {

            $scope.aanterior = (new Date()).getFullYear() - 1;
            //$scope.manterior = ((new Date()).getMonth() + 1) - 2;


            var mesHoy1 = parseInt($scope.mesActual);
            $scope.manterior = mesHoy1 - 1;


            var reg2 = {
                'anio': $scope.aanterior,
                'mes': "12"
            };



            var reg3 = {
                'anio': $scope.aanterior,
                'mes': mesHoy1
            };



            InpcService.getValorAnterior(reg2).then(
                function(result) {
                    $scope.valorAnioAnterior = result.data;

                },
                function(err) {
                    console.error(err);
                }
            );




            if (mesHoy1 == 1) {

                var reg1 = {
                    'anio': $scope.aanterior,
                    'mes': "12"
                };

                InpcService.getValorAnterior(reg1).then(
                    function(result) {
                        $scope.valorMesAnterior = result.data;

                    },
                    function(err) {
                        console.error(err);
                    }
                );

            } else {

                var reg1 = {
                    'anio': $scope.anioActual,
                    'mes': $scope.manterior
                };

                InpcService.getValorAnterior(reg1).then(
                    function(result) {
                        $scope.valorMesAnterior = result.data;

                    },
                    function(err) {
                        console.error(err);
                    }
                );
            }

            InpcService.getValorAnterior(reg3).then(
                function(result) {
                    $scope.valorMismoMesAAnterior = result.data;

                },
                function(err) {
                    console.error(err);
                }
            );


        }



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


            var inflacionMensual = ((parseFloat($scope.valor) / parseFloat($scope.valorMesAnterior.valor)) - 1) * 100;
            var acumuladaAunual = ((parseFloat($scope.valor) / parseFloat($scope.valorAnioAnterior.valor)) - 1) * 100;
            var acumuladavsanioanterior = ((parseFloat($scope.valor) / parseFloat($scope.valorMismoMesAAnterior.valor)) - 1) * 100;


            InpcService.Add(registro).then(
                function(result) {
                    toastr.success("Registro exitoso");

                    var registroAcumulada = {
                        'anio': $scope.anioActual,
                        'mes': $scope.mesActual,
                        'inflacionMensual': inflacionMensual.toFixed(2),
                        'acumuladaAunual': acumuladaAunual.toFixed(2),
                        'acumuladavsanioanterior': acumuladavsanioanterior.toFixed(2)

                    }

                    InpcService.AddAcumulada(registroAcumulada).then(
                        function(result) {},
                        function(err) {
                            console.error(err);
                        }
                    );

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

        $scope.recaulcula = function() {

            $scope.valoresInflacionAnteriores();
        }

        $scope.valoresInflacionAnteriores();


    }

})();