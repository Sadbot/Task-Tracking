//var tt = angular.module('tt', []);
//
//    tt.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
//
//            $scope.current_id = 0;
//
//            $scope.newtask = [{
//                    id: null,
//                    title: 'test',
//                    status: 0,
//                    created: "2015-11-18 13:57:44",
//                    author: 1,
//                    assigner: 1
//                }];
//
//            $scope.getTasks = function () {
//                $http.get('/api/gettasks')
//                        .success(function (data, status) {
//                            $scope.tasks = data;
//                            $scope.status = status;
//                        })
//                        .error(function (data, status) {
//                            $scope.tasks = data || "Request failed";
//                            $scope.status = status;
//                        });
//            };
//
//            $scope.putTasks = function () {
//                $http.put('/api/puttask', $scope.newtask)
//                        .success(function (data, status) {
//                            $scope.data = data;
//                            $scope.status = status;
//                        })
//                        .error(function (data, status) {
//                            $scope.data = data || "Request failed";
//                            $scope.status = status;
//                        });
//            };
//
//            $scope.delTask = function (current_id) {
//                $http.delete('/api/deltask/' + current_id)
//                        .success(function (data, status) {
//                            $scope.data = data;
//                            $scope.status = status;
//                        })
//                        .error(function (data, status) {
//                            $scope.data = data || "Request failed";
//                            $scope.status = status;
//                        });
//            };
//
//        }]);

    tt.controller('LoginController', ['$scope','$http',function($scope, $http){
        $scope.user = '';
        $scope.pass = '';

        $scope.authUser = function (user,pass) {

            var userdata = new Object({
                user: user,
                pass: pass
            });

            $http.post('/api/auth',angular.toJson(userdata))
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
