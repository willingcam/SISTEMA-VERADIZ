(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller("loginCtrl", ["$scope", "$state", "AuthService", "blockUI", 'MenuService', "$timeout", loginCtrl]);

    function loginCtrl($scope, $state, AuthService, blockUI, MenuService, $timeout) {

        $scope.btnClick = false;

        $scope.loginData = {
            userName: "",
            password: ""
        };


        $scope.message = "";

        $scope.login = function() {

            $scope.btnClick = true;
            blockUI.start({ message: "Espere..." });

            AuthService.login($scope.loginData).then(
                function(response) {

                    blockUI.stop();
                    $scope.btnClick = false;

                    if (response.usuario == null) {
                        $scope.message = "Usuario y clave de acceso no validos";
                        toastr.error($scope.message);
                    } else {
                        MenuService.setRolDescripcion(response.usuario.rol);
                        MenuService.setRolId(response.usuario.rolID);
                        MenuService.setMenu(response.funciones);
                        AuthService.idrol = response.usuario.rolID;

                        window.location = "/veradiz.html#/homeAuthorize";
                    }
                },
                function(err) {
                    blockUI.stop();
                    $scope.btnClick = false;

                    $scope.message = "Problema al autentificar";
                    try {
                        if (err.error != undefined && err.error === "The underlying provider failed on Open.") {
                            $scope.message = "Revise su conexión a internet";
                        } else {
                            $scope.message = err.error_description || err.error || "Problema al autentificar";
                        }
                    } catch (ex) {}
                    toastr.error($scope.message);
                });



        };






    }
}());