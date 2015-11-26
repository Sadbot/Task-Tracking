/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//(function (){

'use strict';

angular
        .module('app', ['ui.router','ngCookies', 'app.routes'])
        .controller('AdminController', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
                $scope.isAuthUser = function () {

                    $http.get('api/checkadmin')
                            .success(function (data, status) {

                            })
                            .error(function (data) {
                                $state.go('login');
                            });
                };

                $scope.isAuthUser();

                $scope.isDisabled = function () {
                    return (!$scope.title || !$scope.assigner || !$scope.author);
                };

                $scope.curUser = {};

                $scope.getUsers = function () {
                    $http.get('/api/getusers')
                            .success(function (data, status) {
                                $scope.users = data;
                                $scope.status = status;
                            })
                            .error(function (data) {
                                $scope.error = data;
                            });
                };

                $scope.getUsers();

                $scope.putUser = function (curUser) {
                    $http.put('/api/putuser', curUser)
                            .success(function (data, status) {
                                $scope.data = data;
                                $scope.status = status;
                            })
                            .error(function (data) {
                                $scope.error = data;
                            });
                    $scope.curUser = {};
                };

                $scope.delUser = function (current_id) {
                    $http.get('/api/deluser/' + current_id)
                            .success(function (data, status) {
                                $scope.data = data;
                                $scope.status = status;
                            })
                            .error(function (data, status) {
                                $scope.error = data;
                            });
                };

            }]);

//})();
