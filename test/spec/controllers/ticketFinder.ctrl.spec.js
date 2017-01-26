'use strict';

describe('TicketFinderCtrl', function() {
  var TicketFinderCtrl;
  var municipalities;
  var states;
  var citationCriteria;
  var ticketFinder;

  states = ['AL'];

  var municipalityArray1 = [{
    id: 9,
    municipality_name: "Black Jack",
    court_id: 10
  }];
  var municipalityArray2 = [{
    id: 10,
    municipality_name: "Black White",
    court_id: 84
  }];

  municipalities = {
    combineCountyMunis: function(){
      return (municipalityArray1);
    },
    municipalitiesMapNames: function(){
      return (municipalityArray2);
    },
    translateMapNamesToDatabaseNames: function () {
      return (municipalityArray2);
    }
  };

  ticketFinder = {
    TicketFinderToSelect:{
      TICKET_NUMBER : 'TICKET_NUMBER',
      DRIVER_INFO : 'DRIVER_INFO',
      LOCATION : 'LOCATION',
      NONE : 'NONE'
    }
  };

  var citationCriteria = {
    citationNumber: null,
    licenseNumber: null,
    licenseState: 'MO',
    firstName: null,
    lastName: null,
    municipalityNames: null,
    dob: null
  };

  beforeEach(function() {
    module('yourStlCourts');

    inject(function(Citations,$controller,$state,$uibModal,toaster,$rootScope,$httpBackend){
      TicketFinderCtrl = $controller('TicketFinderCtrl',{
        $state: $state,
        Municipalities:municipalities,
        States: states,
        $uibModal: $uibModal,
        toaster:toaster,
        Citations:Citations,
        TicketFinder:ticketFinder
      });

      TicketFinderCtrl.selectFinder = function (someValue) {

      };
      $httpBackend.whenGET(/municipalities/).respond(200, '');
    });
  });

  it('sets municipalities on initialization',inject(function(){
    expect(TicketFinderCtrl.modifiedMunicipalities).toEqual(municipalityArray1);
    expect(TicketFinderCtrl.municipalitiesMapNames).toEqual(municipalityArray2);
  }));

  it('sets states on initialization',inject(function(){
    expect(TicketFinderCtrl.states).toEqual(states);
  }));

  it('initializes citationCriteria',inject(function(){
    TicketFinderCtrl.selectTicketFinder("Test");
    expect(TicketFinderCtrl.citationCriteria).toEqual(citationCriteria);
  }));

  it('sets correctly determins if it is selected',inject(function(){
    TicketFinderCtrl.currentTicketFinder = "DEF";
    TicketFinderCtrl.finderSelected = "DEF";
    expect(TicketFinderCtrl.isSelected()).toBe(true);
  }));

  it('should toast an error if form not valid',inject(function(toaster){
    spyOn(toaster,'pop');
    TicketFinderCtrl.ticketForm = {$valid: false};
    TicketFinderCtrl.getDOB();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Please provide the required information');

  }));

  it('should open $uibModal when form submitted', inject(function ($rootScope, $uibModal, $q) {
  //reference: http://stackoverflow.com/questions/21214868/mocking-modal-in-angularjs-unit-tests
    var dob = "03/17/1945";
    var modalDefer = $q.defer();
    modalDefer.resolve(dob);
    var modalInstance = {
      result: modalDefer.promise
    };

    spyOn($uibModal, 'open').and.returnValue(modalInstance);
    spyOn(TicketFinderCtrl, 'findTicket');

    TicketFinderCtrl.ticketForm = {
      $valid: true
    };

    TicketFinderCtrl.getDOB();

    $rootScope.$apply();

    var expectedModalOptions = {
      templateUrl: 'views/dobPicker.html',
      controller: 'dobPickerCtrl as ctrl',
      size: 'sm'
    };

    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect(TicketFinderCtrl.citationCriteria.dob).toEqual(dob);
    expect(TicketFinderCtrl.findTicket).toHaveBeenCalled();
  }));

  it('should go to citationInfo if citations were found',inject(function(Citations,$rootScope,$q,$state){
    var deferred = $q.defer();
    deferred.resolve({citations:[{},{}]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($state,'go');
    TicketFinderCtrl.citationCriteria = {dob: "dob"};
    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations:[{},{}]});
  }));

  it('should toast message if no citations were found',inject(function(Citations,$rootScope,$q,toaster){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    spyOn(toaster, 'pop');

    var homeLink = '<a href="/"><u>clicking here</u></a>';
    var noTicketsFoundMsg = 'We could not find any results for the  information you provided. It\'s possible that the municipality that issued your citation does not participate in YourSTLCourts. You may obtain information for any municipality via '+homeLink+'. Mention you\'d like them to participate in YourSTLCourts.';
    var toasterBody = {
      type: 'error',
      body: noTicketsFoundMsg,
      bodyOutputType: 'trustedHtml',
      timeout:7000
    };
    TicketFinderCtrl.citationCriteria = {dob: "dob"};
    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(toaster.pop).toHaveBeenCalledWith(toasterBody);

  }));

  it('should toast message if citations are unable to be looked up',inject(function(Citations,$rootScope,$q,toaster){
    var deferred = $q.defer();
    deferred.reject();
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn(toaster,'pop');
    TicketFinderCtrl.citationCriteria = {dob: "dob"};
    TicketFinderCtrl.findTicket();
    $rootScope.$apply();

    expect(toaster.pop).toHaveBeenCalledWith('error', 'Oh no! We couldn\'t get your ticket information!');
  }));

  it('should set params.citationNumber correctly',inject(function(Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    TicketFinderCtrl.finderSelected = TicketFinderCtrl.TicketFinderToSelect.TICKET_NUMBER;

    TicketFinderCtrl.citationCriteria = {
      citationNumber: '123',
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalityNames: null,
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',citationNumber:'123'});
  }));

  it('should set params.licenseNumber and params.licenseState correctly',inject(function(Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    TicketFinderCtrl.finderSelected = TicketFinderCtrl.TicketFinderToSelect.DRIVER_INFO;

    TicketFinderCtrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: 'ABC',
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalityNames: null,
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',licenseNumber: 'ABC',licenseState: 'MO'});
  }));

  it('should set params.municipalityNames and params.lastName correctly',inject(function(Citations,$q,$rootScope){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    TicketFinderCtrl.finderSelected = TicketFinderCtrl.TicketFinderToSelect.LOCATION;

    TicketFinderCtrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: 'someLastName',
      municipalityNames: [{municipality_name:'alpha'},{municipality_name:'beta'},{municipality_name:'charlie'}],
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',lastName: 'someLastName',municipalityNames: municipalityArray2});
  }));

  it('opens locationPicker Modal and selects municipality names',inject(function($uibModal,$q, $rootScope){
    var modalDefer = $q.defer();
    modalDefer.resolve(['a','b']);
    var modalInstance = {
      result: modalDefer.promise
    };

    spyOn($uibModal, 'open').and.returnValue(modalInstance);

    var expectedModalOptions = {
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
      backdrop: false,
      size: 'md',
      resolve: {
        municipalities: jasmine.any(Function)
      }
    };

    TicketFinderCtrl.openMap();
    $rootScope.$apply();

    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect(TicketFinderCtrl.citationCriteria.municipalityNames).toEqual(['a','b']);

  }));

  it('opens locationPicker Modal and initializes municipalities',inject(function($uibModal,$q,$rootScope){
    var modalDefer = $q.defer();
    modalDefer.resolve(['a','b']);
    var modalInstance = {
      result: modalDefer.promise
    };

    var actualOptions;
    spyOn($uibModal,'open').and.callFake(function(options){
      actualOptions = options;
      return modalInstance;
    });
    TicketFinderCtrl.openMap();
    $rootScope.$apply();
    expect(actualOptions.resolve.municipalities()).toEqual(municipalityArray2);
  }));

});
