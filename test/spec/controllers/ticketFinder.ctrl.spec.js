'use strict';

describe('TicketFinderCtrl', function() {
  var TicketFinderCtrl;
  var municipalities;
  var states;
  var citationCriteria;
  var ticketFinder;
  var citationCriteria;
  var Errors = {
    makeError: function(){
      return "someError";
    },
    ERROR_CODE:{
      NO_CITATIONS_FOUND: "dummy"
    }
  };

  beforeEach(function() {
    module('yourStlCourts');

    states = ['AL'];

    citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalities: null,
      dob: null
    };

    inject(function(Citations, Municipalities, $controller, $state, $uibModal, toaster, $rootScope, $httpBackend, TicketFinder){
      TicketFinderCtrl = $controller('TicketFinderCtrl',{
        $state: $state,
        Municipalities: Municipalities,
        States: states,
        $uibModal: $uibModal,
        toaster: toaster,
        Citations: Citations,
        TicketFinder: TicketFinder,
        $scope:$rootScope.$new(),
        $rootScope: $rootScope,
        Errors:Errors
      });

      TicketFinderCtrl.selectFinder = function (someValue) {

      };
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');
    });
  });

  it('initializes properties',inject(function(){
    expect(TicketFinderCtrl.states).toEqual(states);
    expect(TicketFinderCtrl.citationCriteria).toEqual(citationCriteria);
  }));

  it('sets correctly determins if it is selected',inject(function(){
    TicketFinderCtrl.currentTicketFinder = "DEF";
    TicketFinderCtrl.finderSelected = "DEF";
    expect(TicketFinderCtrl.isSelected()).toBe(true);
  }));

  it('correctly calls selectFinder', inject(function(TicketFinder){
    spyOn(TicketFinderCtrl,'selectFinder');
    TicketFinderCtrl.selectTicketFinder(TicketFinder.TicketFinderToSelect.NONE);
    expect(TicketFinderCtrl.selectFinder).toHaveBeenCalledWith(TicketFinder.TicketFinderToSelect.NONE);
  }));

  it('correctly returns false for isSelected',inject(function(TicketFinder){
    TicketFinderCtrl.finderSelected = TicketFinder.TicketFinderToSelect.NONE;
    TicketFinderCtrl.currentTicketFinder = TicketFinder.TicketFinderToSelect.DRIVER_INFO;
    expect(TicketFinderCtrl.isSelected()).toBe(false);
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
    modalDefer.resolve({dob:dob,lastName:"someName"});
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
      animation:false,
      templateUrl: 'views/lookupSecurity.html',
      controller: 'lookupSecurityCtrl as ctrl',
      size: 'sm'
    };

    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect(TicketFinderCtrl.citationCriteria.dob).toEqual(dob);
    expect(TicketFinderCtrl.citationCriteria.lastName).toEqual("someName");
    expect(TicketFinderCtrl.findTicket).toHaveBeenCalled();
  }));

  it('should go to citationInfo if citations were found',inject(function(Citations,$rootScope,$q,$state){
    var deferred = $q.defer();
    deferred.resolve([{},{}]);
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($state,'go');
    TicketFinderCtrl.citationCriteria = {dob: "dob"};
    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations: [{},{}]});
  }));

  it('should broadcast an error when no citations are found',inject(function(Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    spyOn($rootScope, '$broadcast').and.callThrough();

    TicketFinderCtrl.citationCriteria = {dob: "dob"};
    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('stlCourtsCustomError',"someError");

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
      lastName: 'myLastName',
      municipalityNames: null,
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',lastName: 'myLastName', citationNumber:'123'});
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
      lastName: 'myLastName',
      municipalityNames: null,
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',lastName: 'myLastName',licenseNumber: 'ABC',licenseState: 'MO'});
  }));

  it('should set params.municipalityNames correctly',inject(function(Citations,$q,$rootScope){
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
      municipalities: [{id: 9}, {id: 11}],
      dob: '03/17/1990'
    };

    TicketFinderCtrl.findTicket();
    $rootScope.$apply();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990', lastName: 'someLastName', municipalityIds: [9, 11]});
  }));

  it('should limit municipalities to 5 or less', inject(function(toaster){
     TicketFinderCtrl.citationCriteria.municipalities = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
     spyOn(toaster,'pop');
     TicketFinderCtrl.municipalityAdded({id:6});
     expect(toaster.pop).toHaveBeenCalledWith('info','A maximum of 5 municipalities can be selected at a time.');
     expect(TicketFinderCtrl.citationCriteria.municipalities.length).toEqual(5);
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
    expect(TicketFinderCtrl.citationCriteria.municipalities).toEqual(['a','b']);

  }));

  it('opens locationPicker Modal and initializes municipalities',inject(function($uibModal, $q, $rootScope, Municipalities){
    spyOn(Municipalities, 'findAll');

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

    expect(actualOptions).toEqual({
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
      size: 'md',
      backdrop: false,
      resolve: {
        municipalities: jasmine.any(Function)
      }
    });
    expect(Municipalities.findAll).toHaveBeenCalled();
    expect(TicketFinderCtrl.citationCriteria.municipalities).toEqual(['a', 'b']);
  }));
});
