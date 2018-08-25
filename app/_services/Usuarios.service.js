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
        .factory("UsuariosService", ["$http", "globalGet", UsuariosService]);

    function UsuariosService($http, globalGet) {
        //endpoint hace referencia al consumo del WebAPI, no es indispensable respetar minusculas y mayusculas
        var API = globalGet.get("api");
        var service = {};


        // Get all registers
        service.getAll = function() {
            var endPoint = API + "Repository/Usuarios/read.php";
            return $http.get(endPoint);
        }


        // Get all registers
        service.getAllClients = function() {
            var endPoint = API + "Repository/Usuarios/read_clientes.php";
            return $http.get(endPoint);
        }


        // Get all registers
        service.getAllSocios = function() {
            var endPoint = API + "Repository/Usuarios/read_socios.php";
            return $http.get(endPoint);
        }


        // Get all registers
        service.getAllSociosAsignados = function(id) {
            var endPoint = API + "Repository/EncargadoCuenta/read.php?id=" + id;
            return $http.get(endPoint);
        }



        // Get all registers
        service.getAllRoles = function() {
            var endPoint = API + "Repository/Roles/read.php";
            return $http.get(endPoint);
        }

        service.getById = function(id) {
            var endPoint = API + "Repository/Usuarios/read_one.php?id=" + id;
            return $http.get(endPoint);
        }


        service.Add = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Usuarios/create.php'
            });
        };


        service.AddEncargadoCuenta = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/EncargadoCuenta/create.php'
            });
        };

        service.Update = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Usuarios/update.php'
            });
        };

        service.UpdateContac = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Usuarios/update_contacto.php'
            });
        };

        service.updateState = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Usuarios/desactiva.php'
            });
        };



        return service;

    }

}());