'use strict';

angular.module('ghAngularApp').factory('Sponsor', function ($http) {

    function Login(credentials)
    {
        $http.post(credentials);
    }

    return {
        Login: Login
    };
});
