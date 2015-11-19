var TaskTracker=angular.module('TaskTracker',[]);

TaskTracker.controller('FirstCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.getTask = function () {
            $http({
                method: 'GET',
                url: '/tasks'
            })
                    .then(function (response) {
                        $scope.status = response.status;
                        $scope.data = response.data;
                    }, function (response) {
                        $scope.data = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };

    }]);