'use strict';
angular.module('yourStlCourts').controller('TicketFinderCtrl', function (TicketFinder, Citations, States, Municipalities, $uibModal, toaster, $state, $scope,$rootScope, Errors, MAX_SEARCH_MUNICIPALITIES) {
  var ctrl = this;
  ctrl.states = States;
  ctrl.TicketFinderToSelect = TicketFinder.TicketFinderToSelect;
  ctrl.citationCriteria = {};
  ctrl.maxSearchMunicipalities = MAX_SEARCH_MUNICIPALITIES;
  var openScrollToId = ctrl.openScrollToId ? ctrl.openScrollToId : 'footer';
  var closeScrollToId = ctrl.closeScrollToId ? ctrl.closeScrollToId : 'top';
  var isBoxOpened = false;

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
    if (TicketFinderToSelect === TicketFinder.TicketFinderToSelect.NONE) {
      $scope.$broadcast('scrollToLocation',closeScrollToId,false);
    }
  };

  ctrl.isSelected = function(){
    if (ctrl.finderSelected === ctrl.currentTicketFinder){
      if (!isBoxOpened) { //if the box is opened already, then it has scrolled. don't keep scrolling
        isBoxOpened = true;
        $scope.$broadcast('scrollToLocation', openScrollToId, true);
      }
      return true;
    }else{
      isBoxOpened = false;
      return false;
    }
  };

  ctrl.getDOB = function(form){
    if (form.$valid) {
      var modalInstance = $uibModal.open({
        animation: false, //allows focus cursor to stay in input box on edge & IE browsers
        templateUrl: 'views/lookupSecurity.html',
        controller: 'lookupSecurityCtrl as ctrl',
        size: 'sm'
      });

      modalInstance.result.then(function (result) {
        ctrl.citationCriteria.dob = result.dob;
        ctrl.citationCriteria.lastName = result.lastName;
        ctrl.findTicket();
      });
    } else {
      toaster.pop('error', 'Please provide the required information');
    }
  };

  ctrl.findTicket = function() {
    var params = {
      dob: ctrl.citationCriteria.dob,
      lastName: ctrl.citationCriteria.lastName
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
        break;
    }

    Citations.find(params).then(function(result){
      if(result.length > 0) {
        $state.go('citationInfo', {citations: result});
      } else {
        $rootScope.$broadcast('stlCourtsCustomError',Errors.makeError(Errors.ERROR_CODE.NO_CITATIONS_FOUND,'No tickets found.'));
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
