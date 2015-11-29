'use strict';

angular.module('tt')
    .directive('menuDirective', function () {
        return {
            element: 'E',
            templateUrl: 'templates/menu.tpl.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'

        };
    }
);
