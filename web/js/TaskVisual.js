var tt = angular.module('tt', ['ui.router']);

tt.controller('TaskVisual', ['$scope', '$http', function ($scope, $http) {
        $scope.show = true;
        $scope.users = [{
         id:'',
         login: "admin",
         pass: "d033e22ae348aeb5660fc2140aec35850c4da997",
         is_deleted: 0,
         role: 0},
         {
         id:'',
         login: "sem",
         pass: "335f62dde484a61575f6b10abd004e92ff6a770d",
         is_deleted: 0,
         role:0}];

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



        $scope.tasks = [{
         id: 4,
         title: "test1",
         status: 1,
         created: new Date("11 08 2015 13:45:13"),
         author: 1,
         assigner: 1},
         {
         id: 7,
         title: "test2",
         status: 0,
         created: new Date("11 18 2015 12:32:06"),
         author: 1,
         assigner: 1}];


//<select ng-model="author">
//                    <option ng-repeat="user in users" value="{{$index}}">{{user.login}}</option>
//                </select>
//            </td>
//            <td>
//                <select ng-model="assigner">
//                    <option ng-repeat="user in users" value="{{$index}}">{{user.login}}</option>
//                </select>


        $scope.isDisabled = function () {
            return (!$scope.title || !$scope.assigner || !$scope.author);
        };
        
        //$scope.title = "testN";
        //$scope.status = "1";
        //$scope.login = "andrew";
        //$scope.password = "password";
        var i = 0;
        $scope.addTask = function () {
            $scope.tasks.push({
                id: ++i,
                title: $scope.title,
                created: new Date(),
                status: 1,
                author: $scope.author,
                assigner: $scope.assigner});
        };

        

        $scope.delTask = function (index) {
            $scope.tasks[index].status = 0;
        };

        $scope.delUser = function (index) {
            $scope.users[index].is_deleted = 1;
        };
/*
        $scope.getTasks = function () {
            $http.get('/tasks')
                    .then(function (response) {
                        $scope.tasks = response.data;
                    }, function (response) {
                        $scope.tasks = response.data;
                    });
        };

        $scope.getUsers = function () {
            $http.get('/users')
                    .then(function (response) {
                        $scope.users = response.data;
                    }, function (response) {
                        $scope.users = response.data;
                    });
        };
        */
    }]);

tt.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/tasks");
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
                });
    }]);