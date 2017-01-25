'use strict';

angular.module('yourStlCourts').controller('TicketFinderCtrl', function (Citations,toaster,States,municipalities,$uibModal,$state,TicketFinder) {
  var ctrl = this;
  ctrl.states = States;
  ctrl.modifiedMunicipalities = municipalities.combineCountyMunis();
  ctrl.municipalities = municipalities.friendlyMunicipalities();

  ctrl.citationCriteria = {};
  ctrl.hasEverSelected = false;

  ctrl.TicketFinderToSelect = {
    TICKET_NUMBER : 'TICKET_NUMBER',
    DRIVER_INFO : 'DRIVER_INFO',
    LOCATION : 'LOCATION',
    COURT_SEARCH : 'COURT_SEARCH'
  };

  var optionSelectedMap = {
    TICKET_NUMBER : false,
    DRIVER_INFO : false,
    LOCATION : false,
    COURT_SEARCH : false
  };

  ctrl.setOptionsSelectedMap = function(TicketFinderToSelect){
    initializeCitationCriteria();
    /*ctrl.hasEverSelected = true;
    for(var item in optionSelectedMap){
      optionSelectedMap[item] = (item == TicketFinderToSelect);
    }*/
  };

  ctrl.isUnselected = function(option){
    return !optionSelectedMap[option] && ctrl.hasEverSelected;
  };

  ctrl.isSelected = function(option ){
    return optionSelectedMap[option];
  };

  function initializeCitationCriteria() {
    ctrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalityNames: null,
      dob: null
    };
  }

  ctrl.getDOB = function(citationCriteriaFrm){
    if(citationCriteriaFrm.$valid) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/dobPicker.html',
        controller: 'dobPickerCtrl as ctrl',
        size: 'sm'
      });

      modalInstance.result.then(function (dob) {
        ctrl.citationCriteria.dob = dob;
        ctrl.findTicket();
      });
    } else {
      toaster.pop('error', 'Please provide the required information');
    }
  };

  ctrl.findTicket = function() {
    var params = {
      dob: ctrl.citationCriteria.dob
    };

    if(optionSelectedMap[ctrl.TicketFinderToSelect.TICKET_NUMBER]) {
      params.citationNumber = ctrl.citationCriteria.citationNumber;
    } else if(optionSelectedMap[ctrl.TicketFinderToSelect.DRIVER_INFO]) {
      params.licenseNumber = ctrl.citationCriteria.licenseNumber;
      params.licenseState = ctrl.citationCriteria.licenseState;
    } else if(optionSelectedMap[ctrl.TicketFinderToSelect.LOCATION]) {
      var names = [];
      ctrl.citationCriteria.municipalityNames.forEach(function(municip){
        if (municip.municipality_name == "St. Louis County"){
          //need to search through all counties so add all counties for search purposes
          names.push("Unincorporated Central St. Louis County");
          names.push("Unincorporated West St. Louis County");
          names.push("Unincorporated North St. Louis County");
          names.push("Unincorporated South St. Louis County");
        }else {
          names.push(municip.municipality_name);
        }
      });
      params.municipalityNames = names;
      params.lastName = ctrl.citationCriteria.lastName;
    }

    Citations.find(params).then(function(result){
      if(result.citations.length > 0) {
        $state.go('citationInfo', {citations: result.citations});
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
  };

  ctrl.openMap = function(){
    //see http://angular-ui.github.io/bootstrap/ for documentation
    //could change this so that instead of setting to null pass on to the dialog and dialog can preselect the items
    ctrl.citationCriteria.municipalityNames = null;

    var modalInstance = $uibModal.open({
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
      size: 'md',
      backdrop: false,
      resolve: {
        municipalities: function() {
          return ctrl.municipalities;
        }
      }
    });

    modalInstance.result.then(function (selectedMunicipalities) {
      ctrl.citationCriteria.municipalityNames = selectedMunicipalities;
    });

  };


  initializeCitationCriteria();
});
