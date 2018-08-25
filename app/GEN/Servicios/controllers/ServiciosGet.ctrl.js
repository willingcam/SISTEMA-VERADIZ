/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradizGEN");
    app.controller("ServiciosGetCtrl", ["$scope", "ServiciosService", ServiciosGetCtrl]);

    function ServiciosGetCtrl($scope, ServiciosService) {

        //Variables de carga
        $scope.loading = true;

        $scope.cargaDatos = function() {
            ServiciosService.getAll().then(
                function(result) {

                    $scope.loading = false;
                    $scope.serviciosGet = result.data.records;
                    console.log($scope.serviciosGet);

                },
                function(err) {
                    toastr.error("No se han podido cargar la información de servicios que tenemos registradas");
                }
            );
        }


        $scope.updateState = function(obj) {
            obj.activo = 0;

            var registro = {
                'id': obj.id,
                'activo': 0
            }

            ServiciosService.updateState(registro).then(
                function(result) {
                    $scope.cargaDatos();
                },
                function(err) {
                    toastr.error("Se actualizaron las servicios registrados");
                }
            );
        }

        $scope.cargaDatos();

    }

})();