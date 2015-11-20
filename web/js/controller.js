(function () {

    var tt = angular.module('tt', []);

    tt.controller('ObjectProvider', ['$scope', '$http', function ($scope, $http) {


            
            $scope.getTasks = function () {
                
                $http({
                    method: 'GET',
                    url: '/tasks'
                })
                        .then(function (response) {
                            $scope.tasks = response.data;
                        }, function (response) {
                            $scope.tasks = response.data;
                        });
            };

            $scope.getUsers = function () {
                $http({
                    method: 'GET',
                    url: '/users'
                })
                        .then(function (response) {
                            $scope.users = response.data;
                        }, function (response) {
                            $scope.users = response.data;
                        });
            };

        }]);

    

})();