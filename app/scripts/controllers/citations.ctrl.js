'use strict';

angular.module('yourStlCourts').controller('CitationsCtrl', function (Citations,citationId,toaster,$state,Errors,$rootScope) {
  var ctrl = this;
  ctrl.dob = null;
  ctrl.dobValid = false;
  ctrl.dobOver18 = false;

  ctrl.viewCitation = function(){
    if (ctrl.dobValid && ctrl.dobOver18){
      var params = {
        dob: ctrl.dob,
        citationNumber:citationId
      };
      return Citations.find(params).then(function(result){
        if(result.length > 0) {
          $state.go('citationInfo', {citations: result  });
        } else {
          $rootScope.$broadcast('stlCourtsCustomError',Errors.makeError(Errors.ERROR_CODE.NO_CITATIONS_FOUND,"No tickets found."));
        }
      }, function(){
        toaster.pop('error', 'Oh no! We couldn\'t get your ticket information!');
      });
    }else{
      if (!ctrl.dobValid){
        toaster.pop('error', 'Invalid date of birth.');
      }else{
        if (!ctrl.dobOver18){
          toaster.pop('error', 'Sorry, you must be at least 18 years old to use this site.');
        }
      }
    }
  };
});
