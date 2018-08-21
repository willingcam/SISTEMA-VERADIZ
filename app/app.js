(function() {
    "use strict";

    angular.module("veradiz", ['ui.router',
            'LocalStorageModule',
            'ui.bootstrap',
            'datatables',
            'veradiz.services',
            "blockUI",
            'Globales',
            'ngSanitize',
            'veradiz.controllers'
        ])
        // DEFINICION DEL SERVIDOR 
        //local               
        .constant('HOST', "localhost")
        //servidor
        // .constant('HOST', 'veradiz.com.mx')
        .config(["$stateProvider", "$urlRouterProvider", RouterProvider])
        .run(function(DTDefaultOptions) {
            DTDefaultOptions.setLanguageSource('/Scripts/DataTables/i18n/Spanish.js');
            DTDefaultOptions.setOption('sPaginationType', 'full_numbers');
            DTDefaultOptions.setOption('searchHighlight', 'true');
            DTDefaultOptions.setOption('bStateSave', true);
            DTDefaultOptions.setOption('aLengthMenu', [
                [5, 10, 20, 50],
                [5, 10, 20, 50]
            ]);
            DTDefaultOptions.setDisplayLength(5);
        })
        .filter('BlackListOC', function() {
            return function(oCsRolesBlackList, idRol) {

                if (idRol == undefined || oCsRolesBlackList == undefined || oCsRolesBlackList == null || oCsRolesBlackList.length < 1) {
                    return false;
                }
                try {
                    var dentro = false;
                    for (var i = 0; i < oCsRolesBlackList.length; i++) {
                        if (oCsRolesBlackList[i].rolId == idRol) {
                            dentro = true;
                            break;
                        }
                    }
                    return dentro;
                } catch (e) { return false; }

                return false;
            };
        })
        .run(function($rootScope, MenuService, $window) {
            $rootScope.go = function(authentication) {
                if (!authentication.isAuth) {
                    window.location = "/indexApp.html#/login";
                }

            }
            $rootScope.anioActual = anioActual();

            $rootScope.globalRegresar = function() {
                $window.history.back();
                MenuService.removeGlobalID();
                MenuService.removeGlobalID2();
            }
            $rootScope.$on('$locationChangeStart', function(event) {

            });
        })

    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }).config(function(blockUIConfig) {
        blockUIConfig.message = 'Espere...';
        blockUIConfig.delay = 0; // Change the default delay to N ms before the blocking is visible
    });

    function RouterProvider($stateProvider, $urlRouterProvider) {

        //$urlRouterProvider.otherwise("/home");
        $urlRouterProvider.otherwise("/homeAuthorize");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/home/home.html",
                controller: "cargardatosAnonimo"
            })
            .state("homeAuthorize", {
                url: "/homeAuthorize",
                templateUrl: "app/home/homeAuthorize.html",
                controller: "homeauthorizeCtrl"
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/auth/login.html",
                controller: "loginCtrl"
            })
            .state("cargardatos", {
                url: "/",
                templateUrl: "app/home/cargardatos.html",
                controller: "cargardatosCtrl"
            })



    };

}());