var tt = angular.module('tt', ['ui.router']);

tt.controller('TaskVisual', ['$scope', '$http', function ($scope, $http) {
        $scope.show = true;


        $scope.addUser = function () {
            var hash = '';
            symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for (var i = 0; i < 40; i++) {
                hash += symbols[Math.floor(Math.random() * 16)];
            }
            ;
            $scope.users.push({
                id: '',
                login: $scope.login,
                pass: hash,
                is_deleted: 0,
                role: 0});
        };

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

tt.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
        $scope.user = '';
        $scope.pass = '';

        $scope.authUser = function (user, pass) {

            var userdata = new Object({
                user: user,
                pass: pass
            });

            $http.post('/api/auth', angular.toJson(userdata))
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

tt.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
                .state('tasks', {
                    url: "/tasks",
                    templateUrl: "templates/tasks.tpl.html"//,
//                    controller: "TaskVisual"
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "templates/users.tpl.html"//,
//                    controller: "TaskVisual"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.tpl.html",
                    controller: "LoginController"
                });
    }]);
