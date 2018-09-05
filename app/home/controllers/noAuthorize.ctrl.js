(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller('noAuthorizeCtrl', ['$scope', '$location', 'AuthService', noAuthorizeCtrl]);

    function noAuthorizeCtrl($scope, $location, AuthService) {


        $scope.authentication = AuthService.authentication;


    };
}());