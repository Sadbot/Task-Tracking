/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//(function (){

'use strict';
angular
        .module('app', ['ui.router','ngCookies', 'app.routes'])
        .controller('LoginController', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
                $scope.user = '';
                $scope.pass = '';

                $scope.authUser = function (user, pass) {
                    var userdata = new Object({
                        login: user,
                        pass: pass
                    });
                    $http.post('/api/auth', angular.toJson(userdata))
                            .success(function (data, status) {
                                $cookies.put('login', data.login);
                                $cookies.put('_token', data._token);

                                $state.go('tasks');
                            })
                            .error(function (data, status) {
                                $scope.error = data;
                            });
                };



                $scope.logOut = function () {

                    $cookies.remove('login');
                    $cookies.remove('_token');
                    $cookies.remove('role');

                    $state.go('login');
                };


            }]);

//})();
