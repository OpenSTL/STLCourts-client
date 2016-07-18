'use strict';

angular.module('yourStlCourts').controller('HeaderCtrl', function (Auth) {
  var ctrl = this;

  ctrl.$onInit = function() {
    $('.navbar-collapse li, .navbar-brand').on('click', function(){
      $('.navbar-collapse').collapse('hide');
      $('.navbar-toggle').addClass('collapsed');
    });
  };

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
