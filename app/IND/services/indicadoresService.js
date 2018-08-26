(function() {
    angular
        .module("ModuloPrincipal")
        .factory("IndicadoresService", [
            "$http",
            "HOST",
            IndicadoresService
        ]);


    function IndicadoresService($http, HOST) {
        var service = {};

        service.getDolarDet = function() {
            var endpoint = HOST + "dolarFixDet.php";
            return $http.get(endpoint);
        };


        service.getDolarLiq = function() {
            var endpoint = HOST + "dolarFixLiq.php";
            return $http.get(endpoint);
        };

        service.getCetes28 = function() {
            var endpoint = HOST + "Cetes28.php";
            return $http.get(endpoint);
        };

        service.getTasaObjetivo = function() {
            var endpoint = HOST + "TasasObjetivo.php";
            return $http.get(endpoint);
        };

        service.getTIIE28 = function() {
            var endpoint = HOST + "gettiie28.php";
            return $http.get(endpoint);
        };

        service.getTIIE91 = function() {
            var endpoint = HOST + "gettiie91.php";
            return $http.get(endpoint);
        };

        service.getTasasObjetivo = function() {
            var endpoint = HOST + "TasasObjetivo.php";
            return $http.get(endpoint);
        };


        service.getDolar2Atras = function() {
            var endpoint = HOST + "dolarAtras.php";
            return $http.get(endpoint);
        };

        service.getDFestivos = function(registro) {
            var endpoint = HOST + "read_one.php?fecha=" + registro.fecha;
            return $http.get(endpoint);
        };

        return service;
    }
})();