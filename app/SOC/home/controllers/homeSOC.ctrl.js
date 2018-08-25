(function() {
    'use strict';
    angular
        .module("veradizSOC")
        .controller('homeSOCCtrl', [
            '$scope',
            '$location',
            'AuthService',
            'MenuService',
            homeSOCCtrl
        ]);

    function homeSOCCtrl($scope, $location, AuthService, MenuService) {
        $scope.isSigco = false;
        $scope.isModulo = true;

        $scope.modulo = "SOC";
        $scope.authentication = AuthService.authentication;
        $scope.rol = MenuService.getRolId();
        $scope.rolDescripcion = MenuService.getRolDescripcion();
        $scope.funciones = MenuService.getMenuSOC();

        $scope.logOut = function() {
            AuthService.logOut();
            window.location = "/indexApp.html#/login";
        }
    }
}());