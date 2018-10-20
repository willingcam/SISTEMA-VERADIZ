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


        $scope.valorAnioAnterior = {};
        $scope.valorMesAnterior = {};
        $scope.valorMismoMesAAnterior = {};



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



                $scope.aactual = parseInt($scope.registro.anioActual);
                $scope.aanterior = $scope.aactual - 1;

                var mesHoy1 = parseInt($scope.registro.mesActual);
                $scope.manterior = mesHoy1 - 1;


                var reg2 = {
                    'anio': $scope.aanterior,
                    'mes': "12"
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
                        'anio': $scope.aactual,
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

                var reg3 = {
                    'anio': $scope.aanterior,
                    'mes': mesHoy1
                };

                InpcService.getValorAnterior(reg3).then(
                    function(result) {
                        $scope.valorMismoMesAAnterior = result.data;

                    },
                    function(err) {
                        console.error(err);
                    }
                );


            },
            function(err) {
                console.error(err);
            }
        );

        //Guardar Cambios
        $scope.update = function() {

            if ($scope.registro.anioActual == '' || $scope.registro.anioActual == null || $scope.registro.anioActual == undefined) {
                toastr.error("Debe ingresar año del salario mínimo");
                return false;
            }
            if ($scope.registro.valor == '' || $scope.registro.valor == null || $scope.registro.valor == undefined) {
                toastr.error("Debe ingresar el valor");
                return false;
            }


            $scope.registro.anio = $scope.registro.anioActual;
            $scope.registro.mes = $scope.registro.mesActual;

            InpcService.Update($scope.registro).then(
                function(result) {


                    var inflacionMensual = ((parseFloat($scope.registro.valor) / parseFloat($scope.valorMesAnterior.valor)) - 1) * 100;
                    var acumuladaAunual = ((parseFloat($scope.registro.valor) / parseFloat($scope.valorAnioAnterior.valor)) - 1) * 100;
                    var acumuladavsanioanterior = ((parseFloat($scope.registro.valor) / parseFloat($scope.valorMismoMesAAnterior.valor)) - 1) * 100;


                    var registroAcumulada = {
                        'anio': $scope.registro.anioActual,
                        'mes': $scope.registro.mesActual,
                        'inflacionMensual': inflacionMensual.toFixed(2),
                        'acumuladaAunual': acumuladaAunual.toFixed(2),
                        'acumuladavsanioanterior': acumuladavsanioanterior.toFixed(2)
                    }

                    InpcService.updateAcumulada(registroAcumulada).then(
                        function(result) {

                        },
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


            $scope.aactual = parseInt($scope.registro.anioActual);
            $scope.aanterior = $scope.aactual - 1;

            var mesHoy1 = parseInt($scope.registro.mesActual);
            $scope.manterior = mesHoy1 - 1;


            var reg2 = {
                'anio': $scope.aanterior,
                'mes': "12"
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
                    'anio': $scope.aactual,
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

            var reg3 = {
                'anio': $scope.aanterior,
                'mes': mesHoy1
            };

            InpcService.getValorAnterior(reg3).then(
                function(result) {
                    $scope.valorMismoMesAAnterior = result.data;

                },
                function(err) {
                    console.error(err);
                }
            );
        }




    }
})();