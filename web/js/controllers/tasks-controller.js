/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {

    'use strict';
    angular
            .module('app',['ui.router','ngCookies', 'app.routes'])
            .controller('TasksController', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {

                    $scope.gotoUsers = function () {
                        $state.go('users');
                    };

                    $scope.isAuthUser = function () {

                        $http.get('api/checkuser')
                                .success(function (data, status) {
                                })
                                .error(function (data) {
                                    $state.go('login');
                                });
                    };

                    $scope.isAdmin = function () {

                        $http.get('api/checkadmin')
                                .success(function (data, status) {
                                    return true;
                                })
                                .error(function (data) {
                                    return false;
                                });
                    };

                    $scope.getTasks = function () {

                        $http.get('/api/gettasks')
                                .success(function (data, status) {
                                    $scope.tasks = data.tasks;
                                    $scope.users = data.users;
                                    $scope.status = status;
                                })
                                .error(function (data, status) {
                                    $scope.error = status;
                                });
                    };

                    $scope.isDisabled = function () {
                        return (!$scope.curTask.title || !$scope.curTask.author || !$scope.curTask.assigner);
                    };

                    $scope.curTask = {};

                    $scope.putTask = function (curTask) {
                        $http.put('/api/puttask', curTask)
                                .success(function (data, status) {
                                    $scope.data = data;
                                    $scope.status = status;
                                })
                                .error(function (data, status) {
                                    $scope.error = status;
                                });
                        $scope.curTask = {};
                    };

                    $scope.closeTask = function (current_id) {
                        $http.get('/api/closetask/' + current_id)
                                .success(function (data, status) {
                                    $scope.data = data;
                                    $scope.status = status;
                                })
                                .error(function (data) {
                                    $scope.error = status;
                                });
                    };

                    $scope.asUser = function (id) {
                        var user;
                        for (var i = 0; i < $scope.users.length; i++) {
                            if (id == $scope.users[i].id) {
                                user = $scope.users[i].login;
                            }
                        }
                        return user;
                    };

                    $scope.asStatus = function (status) {
                        if (status == 1)
                            return 'open';
                        else
                            return 'closed';
                    };

                }]);

})();
