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
        .factory("InformesService", ["$http", "globalGet", InformesService]);

    function InformesService($http, globalGet) {
        //endpoint hace referencia al consumo del WebAPI, no es indispensable respetar minusculas y mayusculas
        var API = globalGet.get("api");
        var service = {};

        // Get all registers
        service.getAll = function() {
            var endPoint = API + "Repository/Documentos/read.php";
            return $http.get(endPoint);
        }

        service.getAllDocumentsByAuthor = function(id) {
            var endPoint = API + "Repository/Documentos/read_documents_by_author.php?id=" + id;
            return $http.get(endPoint);
        }
        service.getAllClients = function() {
            var endPoint = API + "Repository/Usuarios/read_clientes.php";
            return $http.get(endPoint);
        }
        service.getOnlyMyClient = function(id) {
            var endPoint = API + "Repository/Usuarios/read_client_us.php?id=" + id;
            return $http.get(endPoint);
        }


        service.getAllMyClientsDocuments = function(id) {
            var endPoint = API + "Repository/Documentos/read_client_documents.php?id=" + id;
            return $http.get(endPoint);
        }

        service.getAllDocumentosPublicados = function(id) {
            var endPoint = API + "Repository/Documentos/documentos_publicados.php?id=" + id;
            return $http.get(endPoint);
        }

        service.getAllOnlyMisDocumentsClient = function(id) {
            var endPoint = API + "Repository/Documentos/read_client.php?id=" + id;
            return $http.get(endPoint);
        }

        service.getDocumentosClienteYaPublicados = function(id) {
            var endPoint = API + "Repository/Documentos/read_client_docs_pub.php?id=" + id;
            return $http.get(endPoint);
        }


        service.getAllMyDocumentsByClient = function(registro) {
            var endPoint = API + "Repository/Documentos/read_documents_client.php?empleado=" + registro.empleado + "&cliente=" + registro.cliente;
            return $http.get(endPoint);
        }

        service.getAllDocumentosPublicadosCliente = function(registro) {
            var endPoint = API + "Repository/Documentos/documentos_cliente_publicado.php?empleado=" + registro.empleado + "&cliente=" + registro.cliente;
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



        service.descargado = function(registro) {
            return $http({
                method: 'POST',
                data: registro,
                url: API + 'Repository/Documentos/descargado.php'
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