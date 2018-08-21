(function() {
    "use strict";
    angular
        .module("veradiz")
        .controller("loginCtrl", ["$scope", "$state", "AuthService", "blockUI", "$timeout", loginCtrl]);

    function loginCtrl($scope, $state, AuthService, blockUI, $timeout) {

        $scope.btnClick = false;
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function() {

            $scope.btnClick = true;
            blockUI.start({ message: "Espere..." });
            //blockUI.message('Espere...');
            AuthService.login($scope.loginData).then(
                function(response) {
                    blockUI.stop();

                    $scope.btnClick = false;
                    if (response.data.id == null) {
                        $scope.message = "Problema al autentificar";
                        toastr.error($scope.message);
                    } else {
                        $state.go('cargardatos');

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