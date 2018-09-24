(function() {
    "use strict";

    angular.module("veradiz", ['ui.router',
            'LocalStorageModule',
            'ui.bootstrap',
            'datatables',
            'veradiz.services',
            'blockUI',
            'Globales',
            'directivas',
            'ngSanitize',
            'textAngular',
            "chart.js",
        ])
        // DEFINICION DEL SERVIDOR 
        //local               
        .constant('HOST', "localhost")
        //servidor
        //.constant('HOST', 'www.veradiz.com.mx')
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        })
        .config(function($provide) {
            // this demonstrates how to register a new tool and add it to the default toolbar
            $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                taOptions.toolbar = [
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                    ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']


                ];
                return taOptions;
            }]);
        })
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
        .run(function($rootScope, MenuService, $window, $location, AuthService, PermisosService, $state) {

            $rootScope.go = function(authentication) {

                if (!authentication.isAuth) {
                    window.location = "/indexApp.html#/login";
                }
            }


            $rootScope.globalRegresar = function() {
                $window.history.back();
                MenuService.removeGlobalID();
                MenuService.removeGlobalID2();
            }
            $rootScope.anioActual = anioActual();
            $rootScope.datePicker = getRangoDeFechaDefault();
            $rootScope.datePicker06 = RangoDeFechaStart(); //default 2006
            $rootScope.$on('$locationChangeStart', function(event) {

            });
            $rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams) {

                var continuar = false;
                $rootScope.nameState = to.name;
                $rootScope.toState = to;
                $rootScope.fromState = from;



                $rootScope.usuarioLogueado = false;
                AuthService.verificaSesion().then(function(res) {

                    if (res != null) {
                        $rootScope.usuarioLogueado = true;
                    }

                    if ($rootScope.usuarioLogueado == false) {
                        try {
                            to.url = to.url.replace(":id2", toParams.id2);
                            to.url = to.url.replace(":id", toParams.id);
                        } catch (ex) {

                        }


                        event.preventDefault();

                        if (to.name != "login") {
                            window.location = "/indexApp.html";
                            event.preventDefault();

                        }

                        ///$location.path('/login')
                        // window.location = "/indexApp.html";


                    } else {


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

                        if (to.name != "homeAuthorize") {
                            var permitir = PermisosService.verificaPermisos(next);

                            if (!permitir.$$state.value) {
                                toastr.error('Intento acceder a una página no autorizada para su rol');
                                // $state.go("noautorizado")
                                window.location = "veradiz.html#/noautorizado";
                                event.preventDefault();
                            }
                        }
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
        })
        .config(function(blockUIConfig) {
            blockUIConfig.message = 'Espere...';
            blockUIConfig.delay = 0; // Change the default delay to N ms before the blocking is visible
        });

    function RouterProvider($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/homeAuthorize");



        $stateProvider

            .state("noautorizado", {
            url: "/noautorizado",
            templateUrl: "app/home/noAuthorize.html",
            controller: "noAuthorizeCtrl"
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


        .state("usuarios", {
                url: "/usuarios",
                templateUrl: "app/Usuarios/UsuariosGet.html",
                controller: "UsuariosGetCtrl"
            })
            .state("usuariosAdd", {
                url: "/usuariosAdd",
                templateUrl: "app/Usuarios/UsuariosAdd.html",
                controller: "UsuariosAddCtrl"
            })
            .state("usuariosEdit", {
                url: "/usuariosEdit/:id",
                templateUrl: "app/Usuarios/UsuariosEdit.html",
                controller: "UsuariosEditCtrl"
            })
            .state("clientes", {
                url: "/clientes",
                templateUrl: "app/Clientes/ClientesGet.html",
                controller: "ClientesGetCtrl"
            })
            .state("clientesAdd", {
                url: "/clientesAdd",
                templateUrl: "app/Clientes/ClientesAdd.html",
                controller: "ClientesAddCtrl"
            })
            .state("clientesEdit", {
                url: "/clientesEdit/:id",
                templateUrl: "app/Clientes/ClientesEdit.html",
                controller: "ClientesEditCtrl"
            })
            .state("clientesResp", {
                url: "/clientesResp/:id",
                templateUrl: "app/Clientes/ClientesResp.html",
                controller: "ClientesRespCtrl"
            })
            .state("noticias", {
                url: "/noticias",
                templateUrl: "app/Noticias/NoticiasGet.html",
                controller: "NoticiasGetCtrl"
            })
            .state("noticiasAdd", {
                url: "/noticiasAdd",
                templateUrl: "app/Noticias/NoticiasAdd.html",
                controller: "NoticiasAddCtrl"
            })
            .state("noticiasEdit", {
                url: "/noticiasEdit/:id",
                templateUrl: "app/Noticias/NoticiasEdit.html",
                controller: "NoticiasEditCtrl"
            })
            .state("servicios", {
                url: "/servicios",
                templateUrl: "app/Servicios/ServiciosGet.html",
                controller: "ServiciosGetCtrl"
            })
            .state("serviciosAdd", {
                url: "/serviciosAdd",
                templateUrl: "app/Servicios/ServiciosAdd.html",
                controller: "ServiciosAddCtrl"
            })
            .state("serviciosEdit", {
                url: "/serviciosEdit/:id",
                templateUrl: "app/Servicios/ServiciosEdit.html",
                controller: "ServiciosEditCtrl"
            })
            .state("informes", {
                url: "/informes",
                templateUrl: "app/Informes/InformesGet.html",
                controller: "InformesGetCtrl"
            })
            .state("informesAdd", {
                url: "/informesAdd",
                templateUrl: "app/Informes/InformesAdd.html",
                controller: "InformesAddCtrl"
            })
            .state("informesEdit", {
                url: "/informesEdit/:id",
                templateUrl: "app/Informes/InformesEdit.html",
                controller: "InformesEditCtrl"
            })
            .state("informess", {
                url: "/informess",
                templateUrl: "app/Informessoc/InformesSocGet.html",
                controller: "InformesSocGetCtrl"
            })
            .state("informessAdd", {
                url: "/informessAdd",
                templateUrl: "app/Informessoc/InformesSocAdd.html",
                controller: "InformesSocAddCtrl"
            })
            .state("informessEdit", {
                url: "/informessEdit/:id",
                templateUrl: "app/Informessoc/InformesSocEdit.html",
                controller: "InformesSocEditCtrl"
            })
            .state("informesenviados", {
                url: "/informesenviados",
                templateUrl: "app/Informessoc/InformesEnvGet.html",
                controller: "InformesEnvGetCtrl"
            })
            .state("clientesinformes", {
                url: "/clientesinformes",
                templateUrl: "app/Informescli/InformesCliGet.html",
                controller: "InformesCliGetCtrl"
            })
            .state("clientesinformesTipo", {
                url: "/clientesinformesTipo/:id",
                templateUrl: "app/Informescli/informescliGetTipo.html",
                controller: "informesCliGetTipoCtrl"
            })
            .state("cetes", {
                url: "/cetes",
                templateUrl: "app/Indicadores/CetesMes.html",
                controller: "CetesMesGetCtrl"
            })
            .state("tiie", {
                url: "/tiie",
                templateUrl: "app/Indicadores/TiieMes.html",
                controller: "TiieMesGetCtrl"
            })
            .state("dolar", {
                url: "/dolar",
                templateUrl: "app/Indicadores/Dolar.html",
                controller: "DolarGetCtrl"
            })
            .state("uma", {
                url: "/uma",
                templateUrl: "app/Uma/umaGet.html",
                controller: "umaGetCtrl"
            })
            .state("umaAdd", {
                url: "/umaAdd",
                templateUrl: "app/Uma/umaAdd.html",
                controller: "umaAddCtrl"
            })
            .state("umaEdit", {
                url: "/umaEdit/:id",
                templateUrl: "app/Uma/umaEdit.html",
                controller: "umaEditCtrl"
            })
            .state("inpc", {
                url: "/inpc",
                templateUrl: "app/Inpc/inpcGet.html",
                controller: "inpcGetCtrl"
            })
            .state("inpcAdd", {
                url: "/inpcAdd",
                templateUrl: "app/Inpc/inpcAdd.html",
                controller: "inpcAddCtrl"
            })
            .state("inpcEdit", {
                url: "/inpcEdit/:id",
                templateUrl: "app/Inpc/inpcEdit.html",
                controller: "inpcEditCtrl"
            })
            .state("inflacion", {
                url: "/inflacion",
                templateUrl: "app/Inflacion/inflacionGet.html",
                controller: "inflacionGetCtrl"
            })
            .state("inflacionAdd", {
                url: "/inflacionAdd",
                templateUrl: "app/Inflacion/inflacionAdd.html",
                controller: "inflacionAddCtrl"
            })
            .state("inflacionEdit", {
                url: "/inflacionEdit/:id",
                templateUrl: "app/Inflacion/inflacionEdit.html",
                controller: "inflacionEditCtrl"
            })

    };
}());