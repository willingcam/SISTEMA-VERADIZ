//Para mayor informacion sobre los componentes que empiezan con el prefijo "uib", como calendarios y otros https://angular-ui.github.io/bootstrap/
(function() {
    "use strict";

    angular
        .module("veradizTESO", ['ui.router',
            'LocalStorageModule',
            'datatables',
            'blockUI',
            'veradiz.TESO.services',
            'veradiz.services',
            'veradiz.controllers',
            'Globales', 'ui.bootstrap', "ui.bootstrap.tpls"
        ])
        .config(function($httpProvider) {

            $httpProvider.interceptors.push('authInterceptorService');
        })
        .config(["$stateProvider", "$urlRouterProvider", RouterProvider])
        .config(function(blockUIConfig) {
            blockUIConfig.message = 'Espere...';
            blockUIConfig.delay = 0; // Change the default delay to N ms before the blocking is visible
        })
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
        .run(function($rootScope, $location, AuthService, MenuService, PermisosService) {
            $rootScope.globalError = function(err) {
                try {
                    toastr.error(err.data.innerException.innerException.exceptionMessage);
                } catch (e) { toastr.error("Problema al recuperar informaci&oacute;n del servidor"); }
                console.error(err);
            }
            $rootScope.go = function(authentication) {

                if (!authentication.isAuth) {
                    window.location = "/indexApp.html#/login";
                }

            }
            $rootScope.setGlobalGo = function(id) {
                $state.go(id);
            }
            $rootScope.anioActual = anioActual();
            $rootScope.globalRegresar = function() {
                //debugger;
                try {

                    if ($window.history.length == 1) {
                        $state.go("home");
                    } else
                        $window.history.back();
                } catch (e) {

                    $state.go("home");
                }
                MenuService.removeGlobalID();
                MenuService.removeGlobalID2();
            }
            $rootScope.datePicker = getRangoDeFechaDefault();

            $rootScope.cancel = function($uibModalInstance) {
                $uibModalInstance.dismiss('cancel');
            }
            $rootScope.setGlobalID = function(id) {

                MenuService.setGlobalID(id);
            }
            $rootScope.getGlobalID = function() {
                return MenuService.getGlobalID();
            }
            $rootScope.setGlobalID2 = function(id) {
                MenuService.setGlobalID2(id);
            }
            $rootScope.getGlobalID2 = function() {
                return MenuService.getGlobalID2();
            }
            $rootScope.setOrigen = function(id) {
                MenuService.setOrigen(id);
            }
            $rootScope.getOrigen = function() {
                return MenuService.getOrigen();
            }
            $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {


                $rootScope.usuarioLogueado = false;
                AuthService.verificaSesion().then(function(res) {


                    if (res != null) {
                        $rootScope.usuarioLogueado = true;
                    }


                    if ($rootScope.usuarioLogueado == false) {
                        window.location = "/veradiz.html";
                    }


                    var next = "";
                    if (typeof to.views === "object") {
                        for (var obj in to.views) {
                            next = to.views[obj].url;
                            break;
                        }
                    }
                    if (typeof to.url === "string") {
                        next = to.url;
                    }

                    var permitir = PermisosService.verificaPermisos(next, 'TESO');

                    if (!permitir.$$state.value) {
                        console.log("entro en condicion despues de permisos");
                        /*
                        toastr.error('No autorizado');
                        window.location = "/index.html#/login";
                        ev.preventDefault();
                        */

                    }

                });
            });
        });

    function RouterProvider($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("home");


        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/TESO/home/homeTESO.html",
                controller: 'homeTESOCtrl'
            }).state("documentos", {
                url: "/documentos",
                templateUrl: "app/TESO/documentos/DocumentosGet.html",
                controller: "DocumentosGetCtrl"
            }).state("documentosAdd", {
                url: "/documentosAdd",
                templateUrl: "app/TESO/Documentos/DocumentosAdd.html",
                controller: "DocumentosAddCtrl"
            }).state("reportes", {
                url: "/reportes",
                templateUrl: "app/TESO/Reportes/ReportesGet.html",
                controller: "ReportesGetCtrl"
            }).state("reportesAdd", {
                url: "/ReportesAdd",
                templateUrl: "app/TESO/Reportes/ReportesAdd.html",
                controller: "ReportesAddCtrl"
            })



    };
})();