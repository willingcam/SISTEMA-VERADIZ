﻿(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory('AuthService', ['$http', '$q', 'localStorageService', 'globalGet', AuthService]);

    function AuthService($http, $q, localStorageService, globalGet) {
        var API = globalGet.get("api");

        var service = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            ultimologin: "",
            nombreCompleto: "",
            rol: "",
            idrol: "",
            idUsuario: "",
            foto: "",
            tipoUsuarioId: ""

        };



        var _verificaSesion = function() {
            var q = $q.defer();
            var datos = localStorageService.get('authorizationData');
            q.resolve(datos);
            return q.promise;
        };




        var _login = function(loginData) {

            var consulta = "Repository/Usuarios/login.php?usuario=" + loginData.userName + "&claveacceso=" + loginData.password;
            debugger;
            return $http.post(globalGet.get("api") + consulta, loginData).then(
                function(response) {

                    debugger;
                    if (response.data.id != null) {
                        var authData = { token: "123", nombreCompleto: response.data.nombre, idUsuario: response.data.id, userName: loginData.userName, ultimologin: new Date(), rol: "", idRol: "", foto: response.data.ubicacion_imagen + response.data.imagen, tipoUsuarioId: response.data.tipoUsuarioId };
                        localStorageService.set('authorizationData', authData);

                        _authentication.isAuth = true;
                        _authentication.userName = loginData.userName;
                        _authentication.idrol = "";
                        _authentication.rol = "";
                        _authentication.idUsuario = response.data.id;
                        _authentication.nombreCompleto = response.data.nombre;
                        _authentication.foto = response.data.ubicacion_imagen + response.data.imagen;
                        _authentication.tipoUsuarioId = response.data.tipoUsuarioId;

                    } else {


                        var authData = { token: "", nombreCompleto: null, userName: null, ultimologin: null };
                        localStorageService.set('authorizationData', authData);

                        _authentication.isAuth = false;
                        _authentication.userName = null;
                        _authentication.idrol = null;
                        _authentication.rol = null;
                        _authentication.idUsuario = null;
                        _authentication.nombreCompleto = null;
                        _authentication.foto = "";
                        _authentication.tipoUsuarioId = "";

                        response = null;
                    }
                    return response;

                });
        };

        var _logOut = function() {
            //toastr.warning("cerrando sesi&oacute;n");
            localStorageService.remove('authorizationData');
            localStorageService.remove('descripcionRol');
            localStorageService.remove('MenuListADM');

            localStorage.clear(); //importante para remover todo incluyendo MenuService._setVariable
            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.nombreCompleto = "";
            _authentication.rol = "";
            _authentication.idrol = "";
            _authentication.idUsuario = null;
            _authentication.foto = "";
            _authentication.tipoUsuarioId = "";
        };


        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.nombreCompleto = authData.nombreCompleto;
            _authentication.rol = authData.rol;
            _authentication.idrol = "";
            _authentication.idUsuario = authData.idUsuario;
            _authentication.ultimologin = authData.ultimologin;
            _authentication.foto = authData.foto;
            _authentication.tipoUsuarioId = authData.tipoUsuarioId;
        }

        var _fillAuthData = function() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {

                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.nombreCompleto = authData.nombreCompleto;
                _authentication.rol = authData.rol;
                _authentication.idrol = "";
                _authentication.idUsuario = authData.idUsuario;
                _authentication.ultimologin = authData.ultimologin;
                _authentication.foto = authData.foto;
                _authentication.tipoUsuarioId = authData.tipoUsuarioId;
            } else {

                _authentication.isAuth = false;
            }
        };

        //service.saveRegistration = _saveRegistration;
        service.login = _login;
        service.logOut = _logOut;
        service.fillAuthData = _fillAuthData;
        service.authentication = _authentication;
        service.verificaSesion = _verificaSesion;

        return service;

    }
})();