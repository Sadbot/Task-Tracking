

angular
        .module('tt')
        .controller('LoginController', ['$scope', '$http', '$cookies', '$state', function ($scope, $http, $cookies, $state) {
                
                var userObj = this;
                
                this.login = '';
                this.pass = '';
                
                this.setUser = function(login, pass){
                    userObj.login = login;
                    userObj.pass = pass;
                }

                this.getUser = function(){
                    return {
                        login: userObj.login,
                        pass: userObj.pass,
                    };
                };

                this.authUser = function (login,pass) {
                    
                    userObj.setUser(login,pass);
                    
                    $http.post('/api/auth', angular.toJson(userObj.getUser()))
                            .success(function (data) {
                                $cookies.put('login', data.login);
                                $cookies.put('_token', data._token);

                                $state.go('tasks');
                            })
                            .error(function (data, status) {
                                $scope.error = data;
                            });
                };



                this.logOut = function () {

                    $cookies.remove('login');
                    $cookies.remove('_token');
                    $cookies.remove('role');

                    $state.go('login');
                };


            }]);