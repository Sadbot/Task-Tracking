'use strict';

var loginModule = angular.module('tt');

loginModule.service('LoginService', function ($http, $cookies) {

    var ls = this;

    this.user = {};

    this.setUser = function (login, _token) {
        ls.user = {
            login: login,
            _token: _token
        };
    };

    this.getUser = function () {
        return ls.user;
    };

    this.isLoggedIn = function () {
        if (ls.user.login === $cookies.get('login') && ls.user._token === $cookies.get('_token'))
            return true;
        return false;
    };

    this.setCookies = function () {
        $cookies.put('login', ls.user.login);
        $cookies.put('_token', ls.user._token);

    };

    this.removeCookies = function () {
        $cookies.remove('login');
        $cookies.remove('_token');
    };

    this.removeUser = function () {
        ls.user = {};
    };

});

loginModule.controller('LoginController', ['$http', '$state', 'LoginService', function ($http, $state, LoginService) {

        var lc = this;

        this.login = '';
        this.pass = '';

        this.getUser = function () {
            return {
                login: lc.login,
                pass: lc.pass
            };
        };

        this.authUser = function (login, pass) {

            $http.post('/api/auth', angular.toJson(lc.getUser()))
                    .success(function (data) {
                        LoginService.setUser(data.login, data._token);
                        LoginService.setCookies(data.login, data._token);
                        $state.go('tasks');
                    });
        };

        this.isLoggedIn = function () {
            return LoginService.isLoggedIn();
        };

        this.logOut = function () {
            LoginService.removeUser();
            LoginService.removeCookies();
        };

    }]);