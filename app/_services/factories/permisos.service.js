(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory('PermisosService', ['$http', '$q', 'globalGet', 'AuthService', 'localStorageService', 'MenuService', PermisosService]);

    function PermisosService($http, $q, globalGet, AuthService, localStorageService, MenuService) {
        var service = {};
        var listafuncionesadmin = MenuService.getMenuAdmin();

        var listafunciones = null;



        service.verificaPermisos = function(siguiente, modulo) {


            switch (modulo) {
                case 'ADM':
                    listafunciones = listafuncionesadmin;
                    break;


                default:
                    break;
            }
            var q = $q.defer();
            try {
                var next = siguiente.replace(':id', '').replace(':seccion', '').replace('/:id2', '');

                var permitir = false;
                listafunciones.forEach(function(element) {
                    if (typeof element.funcion.url !== undefined) {
                        var r = element.funcion.url.split('#');
                        if (r[1] != null) {
                            if (r[1].indexOf(next) >= 0 || next === '/home') {
                                permitir = true;
                                return;
                            }
                        }
                    }
                });

                q.resolve(permitir);

            } catch (error) {
                q.resolve(permitir);
            }
            return q.promise;
        };

        return service;

    }

})();