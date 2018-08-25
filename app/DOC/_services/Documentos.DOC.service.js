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
        .module("veradiz.DOC.services")
        .factory("DocumentosService", ["$http", "globalGet", DocumentosService]);

    function DocumentosService($http, globalGet) {
        //endpoint hace referencia al consumo del WebAPI, no es indispensable respetar minusculas y mayusculas
        var API = globalGet.get("api");
        var service = {};

        // Get all registers
        service.getAll = function() {
            var endPoint = API + "Repository/Documentos/read.php";
            return $http.get(endPoint);
        }

        service.getAllClients = function() {
            var endPoint = API + "Repository/Usuarios/read_clientes.php";
            return $http.get(endPoint);
        }

        service.getById = function(id) {
            var endPoint = API + "Repository/Documentos/read_one.php?id=" + id;
            return $http.get(endPoint);
        }

        service.getByClient = function(id) {
            var endPoint = API + "Repository/Documentos/read_client.php?id=" + id;
            return $http.get(endPoint);
        }

        service.deleteById = function(registro) {
            var endPoint = API + "Repository/Upload/deleteDocumentos.php?id=" + registro.id + "&archivo=" + registro.archivo;
            return $http.get(endPoint);
        }

        service.deleteOnlyDocument = function(registro) {
            var endPoint = API + "Repository/Upload/deleteOnlyDocumentos.php?archivo=" + registro.archivo;
            return $http.get(endPoint);
        }


        service.verifyDocument = function(registro) {
            var endPoint = API + "Repository/Documentos/verify_document.php?cliente=" + registro.clienteId + "&tipo=" + registro.tipoDocumentoId + "&descripcion=" + registro.descripcion;
            return $http.get(endPoint);
        }

        service.documentoTipoCliente = function(registro) {
            var endPoint = API + "Repository/Documentos/read_client_type.php?cliente=" + registro.cliente + "&tipo=" + registro.tipo;
            return $http.get(endPoint);
        }

        service.Update = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Documentos/update.php'
            });
        };


        service.cambioestado = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Documentos/cambioestado.php'
            });
        };

        service.Add = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Documentos/create.php'
            });
        };

        service.getTipoDocumentos = function() {
            var endPoint = API + "Repository/TipoDocumento/read.php";
            return $http.get(endPoint);
        }


        return service;

    }

}());