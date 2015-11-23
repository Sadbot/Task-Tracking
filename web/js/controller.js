(function () {

    var tt = angular.module('tt', ['ngRoute']);

    tt.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'home.html',
                controller: 'TaskController',
                //resolve: {
                //    // I will cause a 1 second delay
                //    delay: function($q, $timeout) {
                //        var delay = $q.defer();
                //        $timeout(delay.resolve, 1000);
                //        return delay.promise;
                //    }
                //}
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginController'
            });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    });

    tt.controller('TaskController', ['$scope', '$http', function ($scope, $http) {

        $scope.current_id = 0;

        $scope.newtask = [{
            id: null,
            title: 'test',
            status: 0,
            created: "2015-11-18 13:57:44",
            author: 1,
            assigner: 1
        }];

        $scope.getTasks = function () {
            $http.get('/api/gettasks')
                .success(function (data, status) {
                    $scope.tasks = data;
                    $scope.status = status;
                })
                .error(function (data, status) {
                    $scope.tasks = data || "Request failed";
                    $scope.status = status;
                });
        };

        $scope.putTasks = function () {
            $http.put('/api/puttask', $scope.newtask)
                .success(function (data, status) {
                    $scope.data = data;
                    $scope.status = status;
                })
                .error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        };

        $scope.delTask = function (current_id) {
            $http.delete('/api/deltask/'+current_id)
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

    tt.controller('LoginController', ['$scope','$http',function($scope, $http){

    }]);

})();