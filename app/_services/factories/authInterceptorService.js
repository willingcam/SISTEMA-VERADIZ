(function() {
    "use strict";

    var app = angular.module("veradiz.services");

    app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', authInterceptorService]);

    function authInterceptorService($q, $location, localStorageService) {

        var authInterceptorServiceFactory = {};

        var _request = function(config) {

            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');

            if (authData && _logueadohoy(authData)) {
                config.headers.Authorization = 'Bearer ' + authData.token;
                try {

                    if (typeof authData.idusuario != "undefined" || authData.idusuario != "null") {
                        if (authData.idusuario != null) {
                            config.headers.UsuarioId = authData.id;
                            config.headers.NombreCompleto = authData.nombre;
                            config.headers.userName = authData.nombre
                        }
                    }
                } catch (e) {
                    //console.log("errAch");
                    // console.log(e);
                }
            }
            return config;
        }


        var _responseError = function(rejection) {
            try {

                if (rejection.status == 401) {
                    toastr.error("No autorizado", "autenticación inválida o caducada");
                    localStorageService.remove('authorizationData');
                    //window.location = "/indexApp.html#/login";
                }
            } catch (e) {}

            if (rejection.data != null)

                if (rejection.status < 0) {
                    toastr.error("se ha negado la conexión", "Verificar la disponibilidad del servidor");
                } else
            if (rejection.status === 401) {
                // window.location = "/indexApp.html#/login";
            } else if (rejection.status === 400) {

            }
            return $q.reject(rejection);
        }

        var _logueadohoy = function(authData) {

            if (authData !== null && authData.ultimologin !== undefined) {
                var ultimologin = new Date(authData.ultimologin);
                var today = new Date();
                if (ultimologin.toDateString() !== today.toDateString()) {
                    localStorageService.remove('authorizationData');

                }
                return true;
            } else {
                localStorageService.remove('authorizationData');

            }
        }


        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;


        return authInterceptorServiceFactory;
    }

})();