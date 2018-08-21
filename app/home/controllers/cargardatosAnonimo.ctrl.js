(function() {
    "use strict";

    angular
        .module("veradiz")
        .controller("cargardatosAnonimo", ['$q', "$scope", "$state", "$location", "AuthService", cargardatosAnonimo]);

    function cargardatosAnonimo($q, $scope, $state, $location, AuthService) {

        $scope.authentication = AuthService.authentication;
        if ($scope.authentication == null || $scope.authentication.isAuth == false) {
            if ($location.$$absUrl.indexOf("indexApp.html") < 1) {
                window.location = "/indexApp.html";
            }
        }
    }
}());