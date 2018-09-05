(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory('PermisosService', ['$http', '$q', 'globalGet', 'AuthService', 'localStorageService', 'MenuService', PermisosService]);

    function PermisosService($http, $q, globalGet, AuthService, localStorageService, MenuService) {
        var service = {};
        var listafuncionesMenu = MenuService.getMenu();




        service.verificaPermisos = function(siguiente) {




            var q = $q.defer();
            try {
                var next = siguiente.replace(':id', '').replace(':seccion', '').replace('/:id2', '');

                var permitir = false;
                listafuncionesMenu.forEach(function(element) {
                    if (typeof element.url_referencia !== undefined) {
                        var r = element.url_referencia.split('#');
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