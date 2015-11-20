(function () {

    var tt = angular.module('tt', []);



    tt.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
            
            

            $scope.getTasks = function () {
                $http.get('tasks').then(function (response) {
                            $scope.tasks = response.data;
                        }, function (response) {
                            $scope.tasks = response.data;
                        });
            };

        }]);

})();