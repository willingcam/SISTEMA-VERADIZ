﻿/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradiz")
        .controller("ClientesRespCtrl", ['$scope', 'UsuariosService', 'globalGet', '$state', '$stateParams', '$http', "localStorageService", "AuthService", "$uibModal", ClientesRespCtrl]);

    function ClientesRespCtrl($scope, UsuariosService, globalGet, $state, $stateParams, $http, localStorageService, AuthService, $uibModal) {

        //Variable API
        var API = globalGet.get("api");
        var id = $stateParams.id;


        $scope.registro = {};
        $scope.sociosasignados = {};

        $scope.urlImagenCompleta = "";

        //Obtene ambito
        UsuariosService.getById(id).then(
            function(result) {

                $scope.registro = result.data;
                $scope.urlImagenCompleta = $scope.registro.ubicacion_imagen + $scope.registro.imagen;
                $scope.archivo = $scope.registro.imagen;

                $scope.usuariosAsignados();
            },
            function(err) {
                console.error(err);
            }
        );


        $scope.usuariosAsignados = function() {

            UsuariosService.getAllSociosAsignados(id).then(
                function(result) {
                    $scope.sociosasignados = result.data.records;
                },
                function(err) {
                    console.error(err);
                }
            );
        }




        $scope.PersonaSeleccionada = null;
        $scope.openUsuarios = function() {

            $scope.empleados = {};
            var modalInstance = $uibModal.open({
                size: 'lg',
                templateUrl: 'app/Clientes/PersonalGet.html',
                controller: 'PersonalGetCtrl',
                resolve: {
                    empleado: function() {
                        return $scope.empleados;
                    }
                },
                scope: $scope
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.PersonaSeleccionada = selectedItem;


                var registro = {
                    "cliente": id,
                    "empleado": $scope.PersonaSeleccionada.id,
                    "estatus": 1
                }

                UsuariosService.AddEncargadoCuenta(registro).then(
                    function(result) {
                        toastr.success("Asignación realizada exitosamente");
                        $scope.usuariosAsignados();
                    },
                    function(err) {
                        console.error(err);
                    }
                );



            });
        }


        $scope.updateState = function(obj) {
            obj.activo = 0;

            var registro = {
                'id': obj.id,
                'estatus': 0
            }


            UsuariosService.desactivaAsignacion(registro).then(
                function(result) {

                    toastr.success("Se eliminó al responsable asignado");
                    $scope.usuariosAsignados();
                },
                function(err) {
                    toastr.error("Fallo al eliminar al responsable asignado");
                }
            );
        }




    }

})();