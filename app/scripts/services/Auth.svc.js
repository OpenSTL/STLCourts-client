'use strict';

angular.module('ghAngularApp').factory('Auth', function ($state) {

  function authenticate(sponsor) {
    localStorage.setItem('sponsor', JSON.stringify(sponsor));
  }

  function getAuthenticatedSponsor() {
    return JSON.parse(localStorage.getItem('sponsor'));
  }

  function isAuthenticated() {
    return !!localStorage.getItem('sponsor');
  }

  function logout() {
    localStorage.removeItem('sponsor');
    $state.go('sponsorLogin');
  }

  var svc = {
    authenticate: authenticate,
    getAuthenticatedSponsor: getAuthenticatedSponsor,
    isAuthenticated: isAuthenticated,
    logout: logout
  };

  return svc;
});
