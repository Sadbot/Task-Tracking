var tt = angular.module('tt', ['ui.router', 'ngCookies']);

tt.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
        $scope.show = true;

        $scope.isDisabled = function () {
            return (!$scope.curTask.title || !$scope.curTask.author || !$scope.curTask.assigner);
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
                        $scope.error = angular.fromJson($scope.data).error;
                    });
        };
        $scope.getTasks();

        $scope.putTask = function (curTask) {
            $http.put('/api/puttask', curTask)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data,status) {
                        $scope.error = angular.fromJson($scope.data.error);
                    });
            $scope.curTask = {};            
        };

        $scope.closeTask = function (current_id) {
            $http.get('/api/closetask/' + current_id)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data) {
                        $scope.error = angular.fromJson($scope.data.error);
                    });
        };

        $scope.asUser = function (id) {
            var user;
            for (var i = 0; i < $scope.users.length; i++) {
                if (id == $scope.users[i].id) {
                    user = $scope.users[i].login;
                }
            }
            return user;
        };

        $scope.asStatus = function (status) {
            if (status == 1)
                return 'open';
            else
                return 'closed';
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
                    .error(function (data) {
                        $scope.error = angular.fromJson($scope.data.error);
                    });
        };
        
        $scope.getUsers();

        $scope.putUser = function (curUser) {
            $http.put('/api/putuser', curUser)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data) {
                        $scope.error = angular.fromJson($scope.data.error);
                    });
            $scope.curUser = {};
        };

        $scope.delUser = function (current_id) {
            $http.get('/api/deluser/' + current_id)
                    .success(function (data, status) {
                        $scope.data = data;
                        $scope.status = status;
                    })
                    .error(function (data, status) {
                        $scope.error = angular.fromJson($scope.data).error;
                    });
        };

    }]);

tt.controller('LoginController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {
        $scope.user = '';
        $scope.pass = '';

        $scope.authUser = function (user, pass) {

            var userdata = new Object({
                login: user,
                pass: pass
            });

            $http.post('/api/auth', angular.toJson(userdata))
                    .success(function (data, status) {
                        $cookies.put('login', data.login);
                        $cookies.put('_token', data._token);

                        $location.path('tasks');
                    })
                    .error(function (data, status) {
                        $scope.error = angular.fromJson($scope.data.error);
                    });


        };

        $scope.isAuthUser = function () {

            var userdata = new Object({
                login: $cookies.get('login'),
                _token: $cookies.get('_token'),
                role: $cookies.get('role'),
            });

            $http.post('api/checkuser', angular.toJson(userdata))
                    .success(function (data, status) {
                        $scope.data = data;

                    })
                    .error(function (data) {
                        return 0;
                    });
        };

        $scope.logOut = function () {

            $cookies.remove('login');
            $cookies.remove('_token');
            $cookies.remove('role');

            $location.path('login');
        };


    }]);

tt.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('tasks', {
                    url: "/tasks",
                    templateUrl: "templates/tasks.tpl.html",
                    controller: "TaskController",
                    authenticate: true
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "templates/users.tpl.html",
                    controller: "AdminController",
                    authenticate: true
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.tpl.html",
                    controller: "LoginController"
                });
        $urlRouterProvider.otherwise("/login");


    }]);
