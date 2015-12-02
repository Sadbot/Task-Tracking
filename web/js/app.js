'use strict';

angular
        .module('tt', ['ui.router', 'ngCookies'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                        .state('login', {
                            url: "/login",
                            templateUrl: "templates/login.tpl.html",
                            controller: "LoginController",
                        })
                        .state('tasks', {
                            url: "/tasks",
                            templateUrl: "templates/tasks.tpl.html",
                            controller: "TaskController",
                            authenticate: true
                        })
                        .state('users', {
                            url: "/users",
                            templateUrl: "templates/admin.tpl.html",
                            controller: "AdminController",
                            authenticate: true
                        });

                $urlRouterProvider.otherwise('/login');


            }]);
