'user strict';

angular
        .module('tt')
        .controller('AdminController', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
                this.isAuthUser = function () {

                    $http.get('api/checkadmin')
                            .success(function (data, status) {

                            })
                            .error(function (data) {
                                $state.go('login');
                            });
                };

                this.isDisabled = function () {
                    return (!$scope.curUser.login || !$scope.curUser.pass || !$scope.curUser.role);
                };

                $scope.curUser = {};

                this.getUsers = function () {
                    $http.get('/api/getusers')
                            .success(function (data, status) {
                                $scope.users = data;
                                $scope.status = status;
                            })
                            .error(function (data) {
                                $scope.error = data;
                            });
                };

                this.putUser = function (curUser) {
                    $http.post('/api/adduser', curUser)
                            .success(function (data, status) {
                                $scope.data = data;
                                $scope.status = status;
                            })
                            .error(function (data) {
                                $scope.error = data;
                            });
                    this.curUser = {};
                };

                this.delUser = function (current_id) {
                    $http.put('/api/deluser/' + current_id)
                            .success(function (data, status) {
                                $scope.data = data;
                                $scope.status = status;
                            })
                            .error(function (data, status) {
                                $scope.error = data;
                            });
                };

            }]);
