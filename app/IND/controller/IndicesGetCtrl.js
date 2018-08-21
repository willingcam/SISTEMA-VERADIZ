(function() {
    angular.module("ModuloPrincipal")
        .controller("IndicesGetCtrl", ["$scope", "IndicadoresService", IndicesGetCtrl]);

    function IndicesGetCtrl($scope, IndicadoresService) {

        $scope.dolarFixDet = "";
        $scope.dolarFixLiq = "";
        $scope.cetes28 = "";
        $scope.tiie28 = "";
        $scope.tiie91 = "";
        $scope.tasaObjetivo = "";

        $scope.dolarAtras = "";






        $scope.obtenerRegistros = function() {

            IndicadoresService.getDolarDet().then(function(exito) {
                $scope.dolarFixDet = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getCetes28().then(function(exito) {
                $scope.cetes28 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });


            IndicadoresService.getTasaObjetivo().then(function(exito) {
                $scope.tasaObjetivo = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getDolar2Atras().then(
                function(exito) {
                    $scope.dolarAtras = exito.data.valor;

                },
                function(error) {
                    console.log("Error:", error);
                });


            IndicadoresService.getTIIE28().then(function(exito) {
                $scope.tiie28 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getTIIE91().then(function(exito) {
                $scope.tiie91 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });


        }

        $scope.obtenerRegistros();




    }

})();