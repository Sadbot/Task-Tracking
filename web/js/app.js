'use strict';

angular
        .module('tt', ['ui.router', 'ngCookies'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

                $locationProvider.html5Mode(true);
                $stateProvider
                        .state('login', {
                            url: "/login",
                            templateUrl: "templates/login.tpl.html",
                            controller: "LoginController",
                        })
                        .state('tasks', {
                            url: "/tasks?:title&:created&:author&:assigner",
                            templateUrl: "templates/tasks.tpl.html",
                            controller: "TaskController",
                            authenticate: true,
                            /*params: {
                             title:'',
                             created:'',
                             author:'',
                             assigner:''
                             }*/
                        })
                        .state('users', {
                            url: "/users",
                            templateUrl: "templates/admin.tpl.html",
                            controller: "AdminController",
                            authenticate: true
                        });

                $urlRouterProvider.otherwise('/login');



            }])
        .run([function () {}]);
