'use strict';

angular.module('yourStlCourts').factory('Sponsor', function ($http) {
  function Login(credentials) {
    return $http.post('sponsors/login', credentials);
  }

  return {
    Login: Login
  };
});
