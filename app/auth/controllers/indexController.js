(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller('indexController', ['$scope', '$location', 'AuthService', 'HOST', indexController]);

    function indexController($scope, $location, AuthService, HOST) {


        $scope.authentication = AuthService.authentication;

        if (AuthService.authentication.userName != undefined) {
            $scope.userName = AuthService.authentication.userName;
        }

        if ((typeof $scope.authentication.isAuth === undefined) || !$scope.authentication.isAuth) {


            if ($location.$$absUrl.indexOf("newpass") < 1) {

                if ($location.$$host.toLowerCase() != HOST.toLowerCase()) {

                    window.location = $location.$$absUrl.replace($location.$$host, HOST);
                }

                if ($location.$$absUrl.indexOf("indexApp.html") < 1 || $location.$$absUrl.indexOf("/#/hom") < 1) {
                    if ($location.$$absUrl.indexOf("veradiz.html") < 1) {

                        window.location = "/indexApp.html#/login";
                    }
                }
            }
        } else {
            if ($location.$$host.toLowerCase() != HOST.toLowerCase()) {

                window.location = $location.$$absUrl.replace($location.$$host, HOST);
            }

            if ($location.$$path == '/home' || $location.$$path == '/login') {
                if ($location.$$absUrl.indexOf("indexApp.html") > 0 || $location.$$absUrl.indexOf("/#/hom") > 0) {
                    window.location = "/veradiz.html";
                } else if ($location.$$absUrl.indexOf("veradiz.html") > 0) {
                    window.location = "/veradiz.html#/homeAuthorize";
                }
            } else {

                if ($location.$$absUrl.indexOf(".html") < 0) {

                    window.location = "/veradiz.html#/homeAuthorize";
                }
                if ($location.$$absUrl.indexOf("indexApp.html") > 0 || $location.$$absUrl.indexOf("/#/hom") > 0) {
                    if ($location.$$path == '') {

                        window.location = "/veradiz.html";
                    }

                }

                if ($location.$$path == '/login') {

                    window.location = "/veradiz.html";
                }
            }
        }


        $scope.logOut = function() {
            AuthService.logOut();


            window.location = "/indexApp.html";
        }


    };
}());