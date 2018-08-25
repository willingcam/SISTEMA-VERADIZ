(function() {
    "use strict";

    angular
        .module("veradiz")
        .controller("cargardatosCtrl", ["$scope", "$state", "$location", "AuthService", "MenuService", "PersonaService", '$uibModal', cargardatosCtrl]);

    function cargardatosCtrl($scope, $state, $location, AuthService, MenuService, PersonaService, $uibModal) {

        $scope.respons = [];
        $scope.message = "";

        $scope.$parent.rolDescripcion = "";


        $scope.funciones = function(id) {
            PersonaService.getFunciones(id, 'ADM').then(
                function(response) {

                    MenuService.setRolDescripcion(AuthService.authentication.rol);
                    MenuService.setRolId(AuthService.authentication.idrol);
                    MenuService.setMenuAdmin(response.records);
                    toastr.success("Bienvenido");

                    var url = MenuService.getReturnUrl();

                    if (url == null) {

                        window.location = "/veradiz.html#/homeAuthorize";
                    } else {
                        MenuService.removeReturnUrl();
                        var puerto = $location.port() == "80" ? "" : ':' + $location.port();
                        var servidor = $location.protocol() + '://' + $location.host() + puerto;
                        var fullUrl = servidor + url;
                        window.location = fullUrl;
                    }

                },
                function(err) {

                });
        };


        $scope.funcionesCLI = function(idRol) {
            PersonaService.getFunciones(idRol, 'CLI').then(
                function(response) {
                    if (typeof response.records.length === 0) {
                        $scope.message = "No hay funciones definidas para su rol";
                        toastr.error($scope.message);
                    } else {
                        MenuService.setMenuCLI(response.records);
                    }

                },
                function(err) {

                });
        };

        $scope.funcionesSOC = function(idRol) {
            PersonaService.getFunciones(idRol, 'SOC').then(
                function(response) {
                    if (typeof response.records.length === 0) {
                        $scope.message = "No hay funciones definidas para su rol";
                        toastr.error($scope.message);
                    } else {
                        MenuService.setMenuSOC(response.records);
                    }

                },
                function(err) {

                });
        };



        $scope.funcionesTSO = function(idRol) {
            PersonaService.getFunciones(idRol, 'TSO').then(
                function(response) {
                    if (typeof response.records.length === 0) {
                        $scope.message = "No hay funciones definidas para su rol";
                        toastr.error($scope.message);
                    } else {
                        MenuService.setMenuTSO(response.records);
                    }

                },
                function(err) {

                });
        };

        $scope.funcionesDOC = function(idRol) {
            PersonaService.getFunciones(idRol, 'CLI').then(
                function(response) {
                    if (typeof response.records.length === 0) {
                        $scope.message = "No hay funciones definidas para su rol";
                        toastr.error($scope.message);
                    } else {
                        MenuService.setMenuDOC(response.records);
                    }

                },
                function(err) {

                });
        };

        $scope.cargarfunciones = function(id) {
            $scope.funciones(id);
        }






        $scope.authentication = AuthService.authentication;
        if (typeof $scope.authentication.isAuth !== undefined && !$scope.authentication.isAuth) {

            window.location = "/indexApp.html#/login";
        }

        if (typeof $scope.authentication.isAuth !== undefined && $scope.authentication.isAuth) {


            //ELIMINA EL MENU DEL LOCALSTORAGE
            MenuService.removeMenu();
            //$scope.cargarfunciones();



            PersonaService.getDatos(AuthService.authentication.idUsuario).then(
                function(response) {

                    if (!(response === null)) {
                        if (typeof response.id !== 'undefined' || typeof response.id !== 'null' || typeof response.id !== null) {

                            $scope.cargarfunciones(response.id);

                        } else {

                            $scope.message = "No hay rol para el usuario: " + AuthService.authentication.userName;
                            toastr.error($scope.message);
                            AuthService.logOut();

                        }
                    } else {
                        $state.go("login");
                    }


                },
                function(err) {

                    $scope.message = "Problema al cargar la informacion del usuario";
                    $scope.message = err.error_description;
                    toastr.error($scope.message);
                    AuthService.logOut();

                });


        }

        $scope.gotoHome = function() {
            $state.go("homeAuthorize");
        }



        $scope.openModal = function(roles) {
            $scope.roles = roles;
            var modalInstance = $uibModal.open({
                templateUrl: 'app/home/listaroles.html',
                backdrop: 'static',
                keyboard: false,
                controller: function($uibModalInstance) {
                    $scope.seleccionaRol = function(rol) {
                        $scope.cargarfunciones(rol.idRol);
                    }
                },
                scope: $scope
            });
        };





    }
}());