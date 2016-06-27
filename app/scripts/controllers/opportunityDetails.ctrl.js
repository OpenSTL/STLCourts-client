'use strict';

angular.module('yourStlCourts').controller('OpportunityDetailsCtrl', function (opportunity, needs, $uibModalInstance, DateFormatter) {
  var ctrl = this;
  ctrl.opportunity = opportunity;
  ctrl.needs = needs;

  ctrl.getDate = function(time){
    return DateFormatter.format(new Date(time), 'mm/dd/yyyy');
  };

  ctrl.cancel = function(){
    $uibModalInstance.dismiss();
  };
});
