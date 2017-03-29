'use strict';

angular.module('yourStlCourts').controller('CitationsCtrl', function (Citations,citationId,toaster,$state) {
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
          var homeLink = '<a href="/"><u>clicking here</u></a>';
          var noTicketsFoundMsg = 'We could not find any results for the  information you provided. It\'s possible that the municipality that issued your citation does not participate in YourSTLCourts. You may obtain information for any municipality via '+homeLink+'. Mention you\'d like them to participate in YourSTLCourts.';
          toaster.pop({
            type: 'error',
            body: noTicketsFoundMsg,
            bodyOutputType: 'trustedHtml',
            timeout:7000
          });
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
