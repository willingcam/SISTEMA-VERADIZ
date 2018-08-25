(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller('homeauthorizeCtrl', ['$scope', '$location', 'AuthService', 'MenuService', homeauthorizeCtrl]);

    function homeauthorizeCtrl($scope, $location, AuthService, MenuService) {


        $scope.authentication = AuthService.authentication;


        if ((typeof $scope.authentication.isAuth === undefined) || !$scope.authentication.isAuth) {
            AuthService.logOut();
            window.location = "/indexApp.html#/login";
        }


        $scope.$parent.rolDescripcion = MenuService.getRolDescripcion();
        MenuService.getModulos().then(
            function(result) { $scope.modulos = result.data },
            function(error) { toastr.error("no se han podido cargar los Modulos"); }
        );



        if (typeof $scope.authentication.isAuth !== undefined && !$scope.authentication.isAuth) {
            $location.path('/home');
        } else {
            $scope.idRol = MenuService.getRolId(); // de cualquier getMenu[Modulo]
        }




    };
}());