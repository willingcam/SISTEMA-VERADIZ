(function() {
    "use strict";

    var app = angular.module("veradiz.controllers", [
        'datatables',
        'ui.bootstrap',
        "veradiz.services",
        'ngTagsInput',
        'ngFabForm',
        'ngMessages'
    ])

    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });


})();