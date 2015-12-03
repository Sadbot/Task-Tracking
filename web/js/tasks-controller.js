'user strict';

angular
        .module('tt')
        .controller('TaskController', ['$scope','$http', '$state', 'LoginService', function ($scope,$http, $state, LoginService) {

                var tc = this;
                this.Tsearch = $state.params;
                this.tasks = {};
                this.users = {};
                this.curTask = {};

                //-----Disablers-------

                this.isDisabled = function () {
                    return (!tc.curTask.title || !tc.curTask.author || !tc.curTask.assigner);
                };

                this.gotoUsers = function () {
                    tc.go('users');
                };

                //-----Main methods------

                this.isLoggedIn = function () {
                    return LoginService.isLoggedIn();
                };

                this.getTasks = function () {

                    $http.get('/api/gettasks')
                            .success(function (data) {
                                tc.tasks = data.tasks;
                                tc.users = data.users;
                            })
                            .error(function (data) {
                                $state.go('login');
                            });                    
                };


                this.putTask = function (curTask) {
                    $http.post('/api/addtask', curTask)
                            .success(function (data) {
                                tc.data = data;
                            });
                    tc.curTask = {};
                };

                this.closeTask = function (current_id) {
                    $http.put('/api/closetask/' + current_id)
                            .success(function (data) {

                            })
                            .error(function (data) {

                            });
                };

                //-----Transforms------
                this.asUser = function (id) {
                    var user;
                    for (var i = 0; i < tc.users.length; i++) {
                        if (id == tc.users[i].id) {
                            user = tc.users[i].login;
                        }
                    }
                    return user;
                };

                this.asStatus = function (status) {
                    if (status == 1)
                        return 'open';
                    else
                        return 'closed';
                };
                
                this.asDate = function (date) {
                   return new Date(date.replace(/-/g,"/"));
                };
                
                $scope.now = new Date();
                
            }]);