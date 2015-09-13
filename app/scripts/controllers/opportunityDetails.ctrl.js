'use strict';

angular.module('ghAngularApp').controller('OpportunityDetailsCtrl', function (opportunity, needs, $modalInstance, DateFormatter) {
  var ctrl = this;
  ctrl.opportunity = opportunity;
  ctrl.needs = needs;

  ctrl.getDate = function(time){
    return DateFormatter.format(new Date(time), 'mm/dd/yyyy');
  };

  ctrl.cancel = function(){
    $modalInstance.dismiss();
  };
});
