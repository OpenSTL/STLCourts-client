'use strict';

angular.module('yourStlCourts').factory('Session', function ($rootScope,$location,$window) {
  //Events
  function initialize() {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      console.log("stateChangeSuccess - " + $location.path() +" - toState: "+toState.name+" fromState: "+fromState.name);
      /*var stateObj = $location.state();
      if (stateObj){
        console.log("History Found: "+stateObj.id);
      }else
        console.log("No History Found");
      $location.state({id:uniqueId++},"",$location.path());*/
      //$location.path($location.path()+"#"+uniqueId++);
      var i = 0;
      i++;
    });

    /*
      This always fires...it fires by itself when navigating hash tags which we won't care about for state
      $rootScope.$on('$locationChangeStart', function (event) {
      //Session.setFromNavigationButton();
      console.log("$locationChangeStart - " + $location.url());
    });*/
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      console.log("$stateChangeStart - " + $location.path() +" - toState: "+toState.name+" fromState: "+fromState.name);
      //Session.createStateObj(toState.name,fromState.name);
    });
  }


  var citationsStack = new Array();
  function getLatestCitationResults() {
    if (citationsStack.length > 0){
     return citationsStack.pop();
    }else{
     return null;
    }
  }
  function addLatestCitationResults(citations){
     if (citations) {
       var copiedCitations = JSON.parse(JSON.stringify(citations));
       citationsStack.push(copiedCitations);
     }else{
       citationsStack.push(null);
     }
   }
  var svc = {
     getLatestCitationResults: getLatestCitationResults,
     addLatestCitationResults: addLatestCitationResults
  };

  return svc;
});
