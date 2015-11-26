(function () {

'use strict';

    angular.module('taskTracker',[])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                            .when('/', {
                                redirectTo: '/login'
                            })
                            .when('/admin', {
                                templateUrl: 'templates/admin.tpl.html',
                                controller: 'AdminController'
                            })
                            .when('/tasks', {
                                templateUrl: 'templates/tasks.tpl.html',
                                controller: 'TaskController',
                            })
                            .when('/login', {
                                templateUrl: 'templates/login.tpl.html',
                                controller: 'LoginController',
                            })
//    .when('/tasks/add/:id', {
//      templateUrl: 'templates/pages/notes/show.html',
//      controller: 'NotesShowController'
//    })
                            .otherwise({
                                redirectTo: '/login'
                            });
                }]);

})();