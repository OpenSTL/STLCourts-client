'use strict';

angular.module('yourStlCourts').controller('HeaderCtrl', function (Auth) {
  var ctrl = this;

  ctrl.isAuthenticated = function(){
    return Auth.isAuthenticated();
  };

  ctrl.getAuthenticatedSponsor = function(){
    return Auth.getAuthenticatedSponsor();
  };

  ctrl.logout = function(){
    Auth.logout();
  };
});
