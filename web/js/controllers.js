var tt = angular.module('tt', ['ui.router','ngCookies']);

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
        
        $scope.asUser = function(id) {
            var user;
            for (var i=0; i<$scope.users.length; i++){
                if (id == $scope.users[i].id){
                    user=$scope.users[i].login;
                }
            }
            return user;
        } ;

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
            $http.put('/api/putuser', curUser)
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
            $http.delete('/api/deluser/' + current_id)
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
                        $cookies.put('role',data.role);
                    })
                    .error(function (data, status) {
                        $scope.data = data || "Request failed";
                    });
        };
    }]);

tt.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
                .state('tasks', {
                    url: "/tasks",
                    templateUrl: "templates/tasks.tpl.html",
                    controller: "TaskController"//,
                    //onEnter: $scope.getTasks()
                    //authenticate: true
                })
                .state('users', {
                    url: "/users",
                    templateUrl: "templates/users.tpl.html",
                    controller: "AdminController"//,
                    //onEnter: $scope.getUsers()
                    //authenticate: true
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.tpl.html",
                    controller: "LoginController"
                });
    }]);

//
//tt.run($scope.getTasks()){
//});
