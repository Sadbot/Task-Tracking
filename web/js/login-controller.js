

var loginModule = angular.module('tt');

loginModule.service('LoginService', function ($http, $cookies) {

    var ls = this;
    this.user = {};

    this.setUser = function (login, pass) {
        ls.user = {
            login: login,
            pass: pass,
        };
    };

    this.getUser = function () {
        return ls.user;
    };

    this.isRequiredUser = function (login, pass) {
        if (ls.user.login === login && ls.user.pass === pass)
            return true;
        return false;
    };

    this.setCookies = function () {
        if (ls.getUser.length){
            $cookies.put('user', ls.user.login);
            $cookies.put('_token', ls.user.pass);
        }
        
    };

    this.removeCookies = function () {
        $cookies.remove('user');
        $cookies.remove('_token');
    };

    this.removeUser = function () {
        ls.user = {};
    };

});

loginModule.controller('LoginController', ['$http', 'LoginService', function ($http,LoginService) {

        var lc = this;

        this.login = '';
        this.pass = '';

        this.getUser = function () {
            return {
                login: lc.login,
                pass: lc.pass,
            };
        };

        this.authUser = function (login, pass) {      
            
            console.log(LoginService.getUser());
            
            $http.post('/api/auth', angular.toJson(lc.getUser()))
                    .success(function (data) {
                        LoginService.setUser(data.login, data._token);
                        LoginService.setCookies();
                    });
        };

        this.isLoggedIn = function () {
            LoginService.isRequiredUser(lc.login, lc.pass);
        };

        this.logOut = function () {
            LoginService.removeUser();
            LoginService.removeCookies();
        };

    }]);