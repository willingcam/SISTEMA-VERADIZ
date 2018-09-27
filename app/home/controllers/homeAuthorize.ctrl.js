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


        if (typeof $scope.authentication.isAuth !== undefined && !$scope.authentication.isAuth) {
            MenuService.setRolDescripcion(AuthService.authentication.rol);
            MenuService.setRolId(AuthService.authentication.idrol);

            toastr.success("Bienvenido");
            $location.path('/home');
        } else {
            $scope.idRol = MenuService.getRolId();
        }




    };
}());