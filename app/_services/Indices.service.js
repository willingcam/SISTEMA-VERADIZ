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

        service.getInflacionAcumulada = function(registro) {

            var endPoint = API + "Repository/Indices/readHInflacion.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaDolar = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHDolar.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaDolarComparativo = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHDolar.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaCetes = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHCetes28.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaTIIE28 = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHTIIE28.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaTIIE91 = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHTIIE91.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.graficaUDIS = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHUDIS.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }


        service.graficainflacion = function(registro) {
            var endPoint = API + "Repository/Indices/graficaHInflacion.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.getUdis = function(registro) {
            var endPoint = API + "Repository/Indices/readHUdis.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }


        service.getTasaObjetivo = function(registro) {
            var endPoint = API + "Repository/Indices/readHTasaObjetivo.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }

        service.getCPP = function(registro) {

            var endPoint = API + "Repository/Indices/readHCPP.php?fechai=" + registro.fechai + "&fechat=" + registro.fechat;
            return $http.get(endPoint);
        }


        service.getValorAnterior = function(registro) {
            var endPoint = API + "Repository/Inpc/read_mesanterior.php?anio=" + registro.anio + "&mes=" + registro.mes;
            return $http.get(endPoint);
        }


        service.AddCPP = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Indices/cppSave.php'
            });
        };

        service.updateCPP = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Indices/updateCPP.php'
            });
        };

        service.deleteCPP = function(id) {

            var endPoint = API + "Repository/Indices/deleteCPP.php?id=" + id;
            return $http.get(endPoint);
        }

        service.getCPPById = function(id) {
            var endPoint = API + "Repository/Indices/cppById.php?id=" + id;
            return $http.get(endPoint);
        }

        return service;

    }

}());