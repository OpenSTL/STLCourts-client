'use strict';

angular.module('ghAngularApp').controller('HeaderCtrl', function (Auth) {
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
