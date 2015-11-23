(function () {

    var tt = angular.module('TaskTracker', []);

    tt.controller('TaskCtrl', ['$scope', '$http', function ($scope, $http) {


            
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

        }]);

    

})();