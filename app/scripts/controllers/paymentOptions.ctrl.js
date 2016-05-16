'use strict';

angular.module('ghAngularApp').controller('PaymentOptionsCtrl', function (citation, Opportunities, $state, $uibModal) {
  var ctrl = this;

  ctrl.citation = citation;

  Opportunities.findByCourtId(citation.court_id).then(function (results) {
    ctrl.opportunities = results;
  });

  ctrl.openNeeds = function(opportunity) {
    $uibModal.open({
      templateUrl: 'views/opportunityDetails.html',
      controller: 'OpportunityDetailsCtrl as ctrl',
      size: 'md',
      resolve: {
        opportunity: function() {
          return opportunity;
        },
        needs: function(Opportunities) {
          return Opportunities.findNeeds(opportunity.id);
        }
      }
    });

    //TODO: Do something if necessary
  };

  ctrl.goBack = function(){
    $state.go('citationInfo', {citations : [ctrl.citation]});
  };
});
