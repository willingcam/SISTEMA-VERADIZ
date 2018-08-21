(function() {
    "use strict";

    angular.module("veradizDESCARGAS", ['ui.router',
            'LocalStorageModule',
            'ui.bootstrap',
            'veradiz.services', "blockUI",
            'Globales', 'mdo-angular-cryptography'
        ])
        .config(["$stateProvider", "$urlRouterProvider", RouterProvider])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }).config(function(blockUIConfig) {
            blockUIConfig.message = 'Espere...';
            blockUIConfig.delay = 0; // Change the default delay to N ms before the blocking is visible
        }).config(['$cryptoProvider', function($cryptoProvider) {
            $cryptoProvider.setCryptographyKey('SIGCO3');
        }]);

    function RouterProvider($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("home");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/Descargas/Vistas/home.html"
            })
            .state("q", {
                url: "/q/:id",
                templateUrl: "app/Descargas/Vistas/Descarga.html",
                controller: "DescargasQ"
            })

    };

}());