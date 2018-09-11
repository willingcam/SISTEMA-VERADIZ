/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("CetesMesGetCtrl", ["$scope", "IndicesService", CetesMesGetCtrl]);

    function CetesMesGetCtrl($scope, IndicesService) {


        $scope.loading = true;

        $scope.actual = "28 días";
        $scope.periodoSel = "28 días";

        $scope.periodo = [{
                "id": "1",
                "descripcion": "28 días"
            },
            {
                "id": "2",
                "descripcion": "1 día"
            }
        ];


        $scope.reset = function() {
            $scope.fechai = new Date();
            $scope.fechat = new Date();

        };

        $scope.cambiafecha = function() {
            var fechaHoy = new Date();

            if ($scope.fechai > fechaHoy) {
                toastr.warning("La fecha de inicio no debe se mayor a la actual.", '', { timeOut: 10000 });
                $scope.fechach = new Date();
            }


            if ($scope.fechat > fechaHoy) {
                toastr.warning("La fecha de termino no debe se mayor a la actual.", '', { timeOut: 10000 });
                $scope.fechach = new Date();
            }


            if ($scope.fechai > $scope.fechat) {
                toastr.warning("La fecha de inicio no debe se mayor a la fecha de termino.", '', { timeOut: 10000 });
                $scope.fechach = new Date();
            }




        };


    }
})();