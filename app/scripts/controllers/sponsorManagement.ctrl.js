'use strict';

angular.module('ghAngularApp').controller('SponsorMgmtCtrl', function ($state, Sponsor, Auth, opportunities, courts, Opportunities, toaster, $modal) {
  var ctrl = this;

  if(!Auth.isAuthenticated()){
    $state.go('sponsorLogin');
  } else {
    ctrl.sponsor = Auth.getAuthenticatedSponsor();
    ctrl.opportunities = opportunities;
    ctrl.courts = courts;
  }

  function findOpportunities(){
    Opportunities.findBySponsorId(ctrl.sponsor.id).then(function(opportunities){
      ctrl.opportunities = opportunities;
    }, function(){
      toaster.pop('error', 'There was an error refreshing opportunities');
    });
  }

  ctrl.createOpportunity = function(){
    var modalInstance = $modal.open({
      templateUrl: 'views/opportunityCreate.html',
      controller: 'OpportunityCreateCtrl as ctrl',
      size: 'md',
      resolve: {
        courts: function() {
          return ctrl.courts;
        }
      }
    });

    modalInstance.result.then(function () {
      findOpportunities();
    });
  };

  ctrl.addNeed = function(opportunity) {
    $modal.open({
      templateUrl: 'views/opportunityNeedCreate.html',
      controller: 'OpportunityNeedCreateCtrl as ctrl',
      size: 'md',
      resolve: {
        courts: function() {
          return ctrl.courts;
        },
        opportunity: function() {
          return opportunity;
        }
      }
    });

    //TODO: Do we need to do anything here? (refresh)
  };

  ctrl.getCourtName = function(opportunity){
    var name = 'Court Name Unavailable';
    courts.every(function(court){
      if(opportunity.courtId === court.id) {
        name = court.municipality;
        return false;
      }

      return true;
    });

    return name;
  };
});
