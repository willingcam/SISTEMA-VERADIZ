(function() {
    'use strict';
    angular
        .module("veradizDOC")
        .controller('homeDOCCtrl', [
            '$scope',
            '$location',
            'AuthService',
            'MenuService',
            homeDOCCtrl
        ]);

    function homeDOCCtrl($scope, $location, AuthService, MenuService) {

        $scope.isModulo = true;

        $scope.modulo = "DOC";
        $scope.authentication = AuthService.authentication;
        $scope.rol = MenuService.getRolId();
        $scope.rolDescripcion = MenuService.getRolDescripcion();
        $scope.funciones = MenuService.getMenuDOC();

        $scope.logOut = function() {
            AuthService.logOut();
            window.location = "/indexApp.html#/login";
        }
    }
}());