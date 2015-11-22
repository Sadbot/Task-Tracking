var tt = angular.module('tt', []);

tt.controller('TaskVisual', ['$scope', function ($scope, $http) {
        $scope.show=true;
        $scope.users = [{
                login: "admin",
                hash: "d033e22ae348aeb5660fc2140aec35850c4da997",
                is_deleted: 0},
            {
                login: "sem",
                hash: "335f62dde484a61575f6b10abd004e92ff6a770d",
                is_deleted: 0}];

        $scope.addUser = function () {
            var hash = '';
            symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for (var i = 0; i < 40; i++) {
                hash += symbols[Math.floor(Math.random() * 16)];
            }
            ;
            $scope.users.push({
                login: $scope.login,
                hash: hash,
                is_deleted: 0});
        };



        $scope.tasks = [{
                id: 4,
                title: "test1",
                state: "1",
                date: new Date("11 08 2015 13:45:13"),
                autor: "1",
                assigner: "1"},
            {
                id: 7,
                title: "test2",
                state: "0",
                date: new Date("11 18 2015 12:32:06"),
                autor: "1",
                assigner: "1"}];

        $scope.title = "testN";
        $scope.state = "1";
        $scope.login = "andrew";
        $scope.password = "password";
        var i = 0;
        $scope.addTask = function () {
            $scope.tasks.push({
                id: i++,
                name: $scope.name,
                title: $scope.title,
                date: new Date(),
                state: $scope.state,
                autor: $scope.autor,
                assigner: $scope.assigner});
        };

        $scope.isDisabled = function () {
            return (!$scope.assigner || !$scope.autor || !$scope.title);
        };

        $scope.delTask = function (index) {
            $scope.tasks[index].state = 0;
        };

        $scope.delUser = function (index) {
            $scope.users[index].is_deleted = 1;
        };
    }]);

tt.directive('showTasks', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/tasks.tpl.html',
		replace: true
	}
});

tt.directive('showUsers', function() {
	return {
		restrict: 'A',
		templateUrl: 'templates/users.tpl.html',
		replace: true
	}
});