(function() {
    "use strict";

    angular
        .module("veradiz.services")
        .factory('MenuService', ['$http', '$q', "globalGet", 'localStorageService', MenuService]);

    function MenuService($http, $q, globalGet, localStorageService) {
        var API = globalGet.get("api");

        var service = {};

        var _listafunciones = {};

        var _removeMenu = function() {
            localStorageService.remove('Menu');
        };

        var _removeReturnUrl = function() {
            localStorageService.remove('ReturnUrl');
        };

        var _setReturnUrl = function(ReturnUrl) {
            localStorageService.set('ReturnUrl', ReturnUrl);
        };

        var _getReturnUrl = function() {
            var ReturnUrl = localStorageService.get('ReturnUrl');
            if (ReturnUrl === null) {
                ReturnUrl = null;
            }
            return ReturnUrl;
        };

        var _setRolDescripcion = function(descripcionRol) {
            localStorageService.set('descripcionRol', descripcionRol);
        };

        var _getRolDescripcion = function() {
            var descripcionRol = localStorageService.get('descripcionRol');
            if (descripcionRol === null) {
                descripcionRol = "";
            }
            return descripcionRol;
        };

        var _setRolId = function(rolId) {
            localStorageService.set('rolId', rolId);
        };

        var _getRolId = function() {
            var rolId = localStorageService.get('rolId');
            if (rolId === null) {
                rolId = "";
            }
            return rolId;
        };

        var _setMenu = function(listafunciones) {
            localStorageService.set('Menu', listafunciones);
        };
        var _getMenu = function() {

            var menu = localStorageService.get('Menu');
            if (menu === null) {
                menu = [];
            }
            return menu;
        };











        var _setVariable = function(nombrevar, valor) {
            localStorageService.set(nombrevar, valor);
        }

        var _getVariable = function(nombrevar) {
            var returnValor = localStorageService.get(nombrevar);
            if (returnValor === null) {
                returnValor = null;
            }
            return returnValor;
        }

        var _deleteVariable = function(nombrevar) {
            localStorageService.remove(nombrevar);
        }

        var _setGlobalID = function(id) {
            localStorageService.set('GlobalID', id);
        };

        var _getGlobalID = function() {
            var result = localStorageService.get('GlobalID');
            if (result === null) {
                result = null;
            }
            return result;
        };

        var _removeGlobalID = function() {
            localStorageService.remove('GlobalID');
        };

        var _setGlobalID2 = function(id) {
            localStorageService.set('GlobalID2', id);
        };

        var _getGlobalID2 = function() {
            var result = localStorageService.get('GlobalID2');
            if (result === null) {
                result = null;
            }
            return result;
        };
        var _removeGlobalID2 = function() {
            localStorageService.remove('GlobalID2');
        };

        var _setOrigen = function(id) {
            localStorageService.set('Origen', id);
        };

        var _getOrigen = function() {
            var result = localStorageService.get('Origen');
            if (result === null) {
                result = null;
            }

            return result;
        };


        var _removeOrigen = function() {
            localStorageService.remove('Origen');
        };


        // Get Expertos
        var _getmodulos = function() {
            var endpoint = API + "Repository/Modulos/read.php";
            return $http.get(endpoint);
        };


        service.setMenu = _setMenu;
        service.getMenu = _getMenu;




        service.setVariable = _setVariable;
        service.getVariable = _getVariable;
        service.deleteVariable = _deleteVariable;
        service.removeMenu = _removeMenu;
        service.listafunciones = _listafunciones;
        service.setRolDescripcion = _setRolDescripcion;
        service.getRolDescripcion = _getRolDescripcion;
        service.setRolId = _setRolId;
        service.getRolId = _getRolId;
        service.getReturnUrl = _getReturnUrl;
        service.setReturnUrl = _setReturnUrl;
        service.removeReturnUrl = _removeReturnUrl;
        service.setGlobalID = _setGlobalID;
        service.getGlobalID = _getGlobalID;
        service.removeGlobalID = _removeGlobalID;

        service.setGlobalID2 = _setGlobalID2;
        service.getGlobalID2 = _getGlobalID2;
        service.removeGlobalID2 = _removeGlobalID2;

        service.setOrigen = _setOrigen;
        service.getOrigen = _getOrigen;
        service.removeOrigen = _removeOrigen;
        service.getModulos = _getmodulos;

        return service;

    }
})();