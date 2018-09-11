/*AYUDA:
FooEntitiesService nombre de factory en RolesGet.service.js
*/

(function() {
    "use strict";
    var app = angular.module("veradiz");
    app.controller("CetesMesGetCtrl", ["$scope", "InformesService", 'AuthService', CetesMesGetCtrl]);

    function CetesMesGetCtrl($scope, InformesService, AuthService) {


        $scope.loading = true;




    }

})();