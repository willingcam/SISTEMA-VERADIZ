/*
AYUDA:
FooEntities.- la entidad en plural, e.j.: Empleados
FooID.-  es el ID del modelo (ID de la tabla)
FooController.- el controlador de WebAPI
FooEntitiesService nombre de factory en ENTITIES.service.js
"iie.services".- referencia a /app/_services/*.service.js
*/
(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory("IndicesService", ["$http", "globalGet", IndicesService]);

    function IndicesService($http, globalGet) {
        //endpoint hace referencia al consumo del WebAPI, no es indispensable respetar minusculas y mayusculas
        var API = globalGet.get("api");
        var service = {};



        service.getCetes28 = function(registro) {
            var endPoint = API + "Repository/Indices/readHCetes28.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.getCetes91 = function(registro) {
            var endPoint = API + "Repository/Indices/readHCetes91.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }


        service.getTIIE28 = function(registro) {
            var endPoint = API + "Repository/Indices/readHTIIE28.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.getTIIE91 = function(registro) {
            var endPoint = API + "Repository/Indices/readHTIIE91.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.getDolar = function(registro) {
            var endPoint = API + "Repository/Indices/readHDolar.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        return service;

    }

}());