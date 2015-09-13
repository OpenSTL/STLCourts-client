'use strict';

angular.module('ghAngularApp').factory('Sponsor', function ($http) {

    function Login(credentials)
    {
        $http.post('sponsors/login', credentials);
    }

    return {
        Login: Login
    };
});
