(function() {
    'use strict';
    angular
        .module("veradizTESO")
        .controller('homeTESOCtrl', [
            '$scope',
            '$location',
            'AuthService',
            'MenuService',
            homeTESOCtrl
        ]);

    function homeTESOCtrl($scope, $location, AuthService, MenuService) {
        $scope.isSigco = false;
        $scope.isModulo = true;

        $scope.modulo = "TESO";
        $scope.authentication = AuthService.authentication;
        $scope.rol = MenuService.getRolId();
        $scope.rolDescripcion = MenuService.getRolDescripcion();

        $scope.funciones = MenuService.setMenuTESO();

        $scope.logOut = function() {
            AuthService.logOut();
            window.location = "/indexApp.html#/login";
        }
    }
}());