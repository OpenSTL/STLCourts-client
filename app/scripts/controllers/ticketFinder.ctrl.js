'use strict';
angular.module('yourStlCourts').controller('TicketFinderCtrl', function (TicketFinder, Citations, States, Municipalities, $uibModal, toaster, $state) {
  var ctrl = this;
  ctrl.states = States;
  ctrl.TicketFinderToSelect = TicketFinder.TicketFinderToSelect;
  ctrl.citationCriteria = {};

  function initializeCitationCriteria() {
    ctrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalities: null,
      dob: null
    };
  }

  ctrl.selectTicketFinder = function(TicketFinderToSelect){
    initializeCitationCriteria();
    ctrl.selectFinder(TicketFinderToSelect);
  };

  ctrl.isSelected = function(){
    return (ctrl.finderSelected == ctrl.currentTicketFinder);
  };

  ctrl.getDOB = function(){
    if(ctrl.ticketForm.$valid) {
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

    switch(ctrl.finderSelected){
      case ctrl.TicketFinderToSelect.TICKET_NUMBER:
        params.citationNumber = ctrl.citationCriteria.citationNumber;
        break;
      case ctrl.TicketFinderToSelect.DRIVER_INFO:
        params.licenseNumber = ctrl.citationCriteria.licenseNumber;
        params.licenseState = ctrl.citationCriteria.licenseState;
        break;
      case ctrl.TicketFinderToSelect.LOCATION:
        params.municipalityIds = _.map(ctrl.citationCriteria.municipalities, 'id');
        params.lastName = ctrl.citationCriteria.lastName;
        break;
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
    ctrl.citationCriteria.municipalities = [];

    var modalInstance = $uibModal.open({
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
      size: 'md',
      backdrop: false,
      resolve: {
        municipalities: function() {
          return Municipalities.findAll();
        }
      }
    });

    modalInstance.result.then(function (selectedMunicipalities) {
      ctrl.citationCriteria.municipalities = selectedMunicipalities;
    });
  };

  initializeCitationCriteria();
});
