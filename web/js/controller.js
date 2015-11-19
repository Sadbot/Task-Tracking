(function () {

    var tt = angular.module('tt', []);

    tt.controller('TaskCtrl', ['$scope', '$http', function ($scope, $http) {

            $scope.getTask = function () {
                $http({
                    method: 'GET',
                    url: '/tasks'
                })
                        .then(function (response) {
                            $scope.status = response.status;
                            $scope.tasks = response.data;
                        }, function (response) {
                            $scope.tasks = response.data || "Request failed";
                            $scope.status = response.status;
                        });
            };

            $scope.getUser = function () {
                $http({
                    method: 'GET',
                    url: '/users'
                })
                        .then(function (response) {
                            $scope.status = response.status;
                            $scope.users = response.data;
                        }, function (response) {
                            $scope.data = response.data || "Request failed";
                            $scope.users = response.status;
                        });
            };

        }]);

})();