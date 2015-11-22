(function () {

    var tt = angular.module('tt', []);


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
            $http.get('/gettasks')
                .success(function (data, status) {
                    $scope.status = status;
                    $scope.tasks = data;
                })
                .error(function (data, status) {
                    $scope.tasks = data || "Request failed";
                    $scope.status = status;
                });
        };

        $scope.putTasks = function () {
            $http.put('/puttask', $scope.newtask)
                .success(function (data, status) {
                    $scope.status = status;
                })
                .error(function (data, status) {
                    $scope.data = data || "Request failed";
                });
        };

        $scope.delTask = function (current_id) {
            $http.delete('/deltask', $scope.id)
                .success(function (data, status) {
                    $scope.status = status;
                })
                .error(function (data, status) {
                    $scope.data = data || "Request failed";
                });
        };

    }]);

})();