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
            var endpoint = HOST + "Indices/dolarFixDet.php";
            return $http.get(endpoint);
        };


        service.getDolarLiq = function() {
            var endpoint = HOST + "Indices/dolarFixLiq.php";
            return $http.get(endpoint);
        };

        service.getCetes28 = function() {
            var endpoint = HOST + "Indices/Cetes28.php";
            return $http.get(endpoint);
        };

        service.getTasaObjetivo = function() {
            var endpoint = HOST + "Indices/TasasObjetivo.php";
            return $http.get(endpoint);
        };

        service.getTIIE28 = function() {
            var endpoint = HOST + "Indices/gettiie28.php";
            return $http.get(endpoint);
        };

        service.getTIIE91 = function() {
            var endpoint = HOST + "Indices/gettiie91.php";
            return $http.get(endpoint);
        };

        service.getTasasObjetivo = function() {
            var endpoint = HOST + "Indices/TasasObjetivo.php";
            return $http.get(endpoint);
        };


        service.getDolar2Atras = function() {
            var endpoint = HOST + "Indices/dolarAtras.php";
            return $http.get(endpoint);
        };

        service.getDFestivos = function(registro) {
            var endpoint = HOST + "Indices/read_one.php?fecha=" + registro.fecha;
            return $http.get(endpoint);
        };

        service.getTodasLasNoticias = function(registro) {
            var endpoint = HOST + "Noticias/read.php";
            return $http.get(endpoint);
        };
        service.getUltimasNoticias = function(registro) {
            var endpoint = HOST + "Noticias/read_last.php";
            return $http.get(endpoint);
        };
        service.enviarCorreo = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Correo/enviar.php'
            });
        };
        return service;
    }
})();