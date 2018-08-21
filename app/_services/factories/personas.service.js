(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory('PersonaService', ['$http', '$q', 'globalGet', 'AuthService', 'localStorageService', PersonaService]);

    function PersonaService($http, $q, globalGet, AuthService, localStorageService) {
        var API = globalGet.get("api");

        var service = {};

        service.getDatos = function(id) {

            var q = $q.defer();
            var url = API + '/Repository/Usuarios/user_data.php?id=' + id;

            debugger;
            try {
                //console.log("ach:");
                //console.log(API + 'Personas/GetByRU/' + username);



                $http.get(url)
                    .success(function(response) {
                        if (response != null) {

                            debugger;

                            AuthService.authentication.nombreCompleto = response.nombre;
                            //AuthService.authentication.userprofile = response;
                            AuthService.authentication.rol = response.rol;
                            AuthService.authentication.idrol = response.rolId;


                            AuthService.authentication.idUsuario = response.id;

                            AuthService.authentication.foto = response.ubicacion_imagen + response.imagen;

                            var authData = localStorageService.get('authorizationData');
                            //authData.userprofile = AuthService.authentication.userprofile;
                            authData.nombreCompleto = AuthService.authentication.nombreCompleto;
                            authData.foto = response.ubicacion_imagen + response.imagen;
                            authData.rol = AuthService.authentication.rol;
                            authData.idRol = AuthService.authentication.idRol;
                            authData.idUsuario = response.id;
                            localStorageService.set('authorizationData', authData);
                        } else {
                            AuthService.logOut();
                            toastr.error("Error al cargar los datos del usuario...");
                        }
                        q.resolve(response);

                    })
                    .error(function(err, status) {

                        toastr.error("Error al cargar los datos del usuario..." + "<br>" + err.messageDetail);
                        q.reject(err);
                    });
                return q.promise;
            } catch (e) {
                q.reject(err);
            }

        };

        service.getFunciones = function(idrol, modulo) {
            var q = $q.defer();
            var url = API + 'Repository/FuncionesRol/funcionesRol.php?rol=' + idrol;
            try {
                $http.get(url)
                    .success(function(response) {
                        if (response != null) {

                        } else {
                            toastr.error("Error al cargar las funciones del usuario...");
                        }
                        q.resolve(response);

                    })
                    .error(function(err, status) {
                        toastr.error("Error al cargar las funciones del usuario..." + "<br>" + err.messageDetail);
                        q.reject(err);
                    });
                return q.promise;
            } catch (e) {
                q.reject(err);
            }

        }

        return service;

    }

})();