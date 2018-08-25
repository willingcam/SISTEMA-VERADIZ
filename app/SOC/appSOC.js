﻿//Para mayor informacion sobre los componentes que empiezan con el prefijo "uib", como calendarios y otros https://angular-ui.github.io/bootstrap/
(function() {
    "use strict";

    angular
        .module("veradizSOC", ['ui.router',
            'LocalStorageModule',
            'datatables',
            'blockUI',
            'veradiz.SOC.services',
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

                    var permitir = PermisosService.verificaPermisos(next, 'ADM');

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
            $rootScope.$on('$viewContentLoaded', function(event, viewName, viewContent) {
                $(":file").addClass("filestyle");
                $('.filestyle').each(function() {
                    var $this = $(this),
                        options = {
                            'input': $this.attr('data-input') === 'false' ? false : true,
                            'icon': $this.attr('data-icon') === 'false' ? false : true,
                            'buttonBefore': $this.attr('data-buttonBefore') === 'true' ? true : false,
                            'disabled': $this.attr('data-disabled') === 'true' ? true : false,
                            'size': $this.attr('data-size'),
                            'buttonText': $this.attr('data-buttonText'),
                            'buttonName': $this.attr('data-buttonName'),
                            'iconName': $this.attr('data-iconName'),
                            'badge': $this.attr('data-badge') === 'false' ? false : true,
                            'placeholder': $this.attr('data-placeholder')
                        };
                    $this.filestyle(options);
                });

                // Panel toolbox
                $(document).ready(function() {
                    $('.collapse-link').on('click', function() {
                        var $BOX_PANEL = $(this).closest('.x_panel'),
                            $ICON = $(this).find('i'),
                            $BOX_CONTENT = $BOX_PANEL.find('.x_content');

                        // fix for some div with hardcoded fix class
                        if ($BOX_PANEL.attr('style')) {
                            $BOX_CONTENT.slideToggle(200, function() {
                                $BOX_PANEL.removeAttr('style');
                            });
                        } else {
                            $BOX_CONTENT.slideToggle(200);
                            $BOX_PANEL.css('height', 'auto');
                        }

                        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
                    });

                    $('.close-link').click(function() {
                        var $BOX_PANEL = $(this).closest('.x_panel');

                        $BOX_PANEL.remove();
                    });
                });
                window.scrollTo(0, 0);
            }); //Fin de $viewContentLoaded

        });

    function RouterProvider($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("home");


        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/SOC/home/homeSOC.html",
                controller: 'homeSOCCtrl'
            })
            .state("documentos", {
                url: "/documentos",
                templateUrl: "app/SOC/Documentos/DocumentosGet.html",
                controller: "DocumentosGetCtrl"
            })
            .state("documentosAdd", {
                url: "/documentosAdd",
                templateUrl: "app/SOC/Documentos/DocumentosAdd.html",
                controller: "DocumentosAddCtrl"
            })
            .state("documentosEdit", {
                url: "/documentosEdit/:id",
                templateUrl: "app/SOC/Documentos/DocumentosEdit.html",
                controller: "DocumentosEditCtrl"
            })

    };
})();