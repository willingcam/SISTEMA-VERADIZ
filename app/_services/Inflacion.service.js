﻿/*
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
        .factory("InflacionService", ["$http", "globalGet", InflacionService]);

    function InflacionService($http, globalGet) {
        //endpoint hace referencia al consumo del WebAPI, no es indispensable respetar minusculas y mayusculas
        var API = globalGet.get("api");
        var service = {};


        // Get all registers
        service.getAll = function() {
            var endPoint = API + "Repository/Inflacion/read.php";
            return $http.get(endPoint);
        }


        service.getById = function(id) {
            var endPoint = API + "Repository/Inflacion/read_one.php?id=" + id;
            return $http.get(endPoint);
        }


        service.Add = function(registro) {
                return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Inflacion/create.php'
            });
        };

        service.Update = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Inflacion/update.php'
            });
        };

        service.Delete = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Inflacion/delete.php'
            });
        };



        return service;

    }

}());