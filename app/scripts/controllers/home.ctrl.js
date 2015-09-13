'use strict';

angular.module('ghAngularApp').controller('HomeCtrl', function (Citations, toaster, States, municipalities, $modal) {
  var ctrl = this;
  ctrl.states = States;
  ctrl.municipalities = municipalities;

  ctrl.citationCriteria = {};

  ctrl.hasEverSelected = false;
  var optionSelectedMap = {
    TICKET_NUMBER : false,
    DRIVER_INFO : false,
    LOCATION : false
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

  ctrl.getTicketWithNumber = function(){
    initializeCitationCriteria();
    ctrl.hasEverSelected = true;
    optionSelectedMap.TICKET_NUMBER = true;
    optionSelectedMap.DRIVER_INFO = false;
    optionSelectedMap.LOCATION = false;
  };

  ctrl.getTicketWithDriverInfo = function(){
    initializeCitationCriteria();
    ctrl.hasEverSelected = true;
    optionSelectedMap.TICKET_NUMBER = false;
    optionSelectedMap.DRIVER_INFO = true;
    optionSelectedMap.LOCATION = false;
  };

  ctrl.getTicketWithLocation = function(){
    initializeCitationCriteria();
    ctrl.hasEverSelected = true;
    optionSelectedMap.TICKET_NUMBER = false;
    optionSelectedMap.DRIVER_INFO = false;
    optionSelectedMap.LOCATION = true;
  };

  ctrl.findTicket = function(citationCriteriaFrm) {
    if(citationCriteriaFrm.$valid) {
      var params = {
        dob: ctrl.citationCriteria.dob
      };

      if(optionSelectedMap['TICKET_NUMBER']) {
        params.citationNumber = ctrl.citationCriteria.citationNumber;
      } else if(optionSelectedMap['DRIVER_INFO']) {
        params.licenseNumber = ctrl.citationCriteria.licenseNumber;
        params.licenseState = ctrl.citationCriteria.licenseState;
      } else if(optionSelectedMap['LOCATION']) {
        params.municipalityNames = ctrl.citationCriteria.municipalityNames;
        params.firstName = ctrl.citationCriteria.firstName;
        params.lastName = ctrl.citationCriteria.lastName;
      }

      Citations.find(params).then(function(criteria){
        console.log(criteria);
      }, function(){
        toaster.pop('error', 'Oh no! We couldn\'t get your ticket information!');
      });
    }
  };

  ctrl.openMap = function(){
    ctrl.citationCriteria.municipalityNames = null;

    var modalInstance = $modal.open({
      templateUrl: 'views/locationPickerMap.html',
      controller: 'locationPickerMapCtrl as ctrl',
      size: 'md',
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
