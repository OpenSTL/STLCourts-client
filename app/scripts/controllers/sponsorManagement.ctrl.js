'use strict';

angular.module('ghAngularApp').controller('SponsorMgmtCtrl', function ($state, Sponsor, Auth) {
  var ctrl = this;
  if(!Auth.isAuthenticated()){
    $state.go('sponsorLogin');
  } else {
    ctrl.sponsor = Auth.getAuthenticatedSponsor();
  }
});
