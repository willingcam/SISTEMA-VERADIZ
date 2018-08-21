(function() {
    'use strict';
    angular
        .module("veradizCLI")
        .controller('homeCLICtrl', [
            '$scope',
            '$location',
            'AuthService',
            'MenuService',
            homeCLICtrl
        ]);

    function homeCLICtrl($scope, $location, AuthService, MenuService) {
        $scope.isSigco = false;
        $scope.isModulo = true;

        $scope.modulo = "CLI";
        $scope.authentication = AuthService.authentication;
        $scope.rol = MenuService.getRolId();
        $scope.rolDescripcion = MenuService.getRolDescripcion();
        $scope.funciones = MenuService.getMenuCLI();

        $scope.logOut = function() {
            AuthService.logOut();
            window.location = "/indexApp.html#/login";
        }
    }
}());