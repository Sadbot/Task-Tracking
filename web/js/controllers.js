var tt = angular.module('tt', ['ui.router','ngCookies']);

tt.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
        $scope.show = true;

        $scope.isDisabled = function () {
            return (!$scope.title || !$scope.assigner || !$scope.author);
        };

        $scope.curTask = {};

        $scope.getTasks = function () {

            $http.get('/api/gettasks')
                    .success(function (data, status) {
                        $scope.tasks = data.tasks;
                        $scope.users = data.users;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.tasks = data || "Request failed";
                        $scope.status = status;
                    });
        };

        $scope.putTask = function (curTask) {
            $http.put('/api/puttask', curTask)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            $scope.curTask = {};
        };

        $scope.delTask = function (current_id) {
            $http.delete('/api/deltask/' + current_id)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
        };

    }]);

tt.controller('AdminController', ['$scope', '$http', function ($scope, $http) {
        $scope.show = true;

        $scope.isDisabled = function () {
            return (!$scope.title || !$scope.assigner || !$scope.author);
        };

        $scope.curUser = {};

        $scope.getUsers = function () {

            $http.get('/api/getusers')
                    .success(function (data, status) {
                        $scope.users = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.tasks = data || "Request failed";
                        $scope.status = status;
                    });
        };

        $scope.putUser = function (curUser) {
            $http.put('/api/putuser', curTask)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            $scope.curUser = {};
        };

        $scope.delUser = function (current_id) {
            $http.delete('/api/deltask/' + current_id)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
        };

    }]);

tt.controller('LoginController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        $scope.user = '';
        $scope.pass = '';

        $scope.authUser = function (user, pass) {

            var userdata = new Object({
                user: user,
                pass: pass
            });

            $http.post('/api/auth', angular.toJson(userdata))
                    .success(function (data, status) {
                        $cookies.put('login',data.login);
                        $cookies.put('_token',data._token);
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                    });
        }
    }]);

tt.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
                .state('tasks', {
                    url: "/tasks",
                    templateUrl: "templates/tasks.tpl.html",
                    controller: "TaskController"
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "templates/users.tpl.html",
                    controller: "AdminController"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.tpl.html",
                    controller: "LoginController"
                });
    }]);
