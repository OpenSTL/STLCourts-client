'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;
  var states;
  var citationCriteria;

  states = ['AL'];

  municipalities = [{
    id: 9,
    municipality_name: "Black Jack",
    court_id: 10
  }];

  var citationCriteria = {
    citationNumber: null,
    licenseNumber: null,
    licenseState: 'MO',
    firstName: null,
    lastName: null,
    municipalityNames: null,
    dob: null
  };

  var fakeModal = {
    result: {
      then: function(confirmCallback, cancelCallback) {
        //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
        this.confirmCallBack = confirmCallback;
        this.cancelCallback = cancelCallback;
      }
    },
    close: function( item ) {
      //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
      this.result.confirmCallBack( item );
    },
    dismiss: function( type ) {
      //The user clicked cancel on the modal dialog, call the stored cancel callback
      this.result.cancelCallback( type );
    }
  };


  beforeEach(function() {
    module('yourStlCourts');

    inject(function(Citations,$controller,$state,$uibModal,toaster,$httpBackend){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        municipalities:municipalities,
        States: states,
        $uibModal: $uibModal,
        toaster:toaster,
        Citations:Citations
      });

      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/municipalities/).respond(200, '');
    });
  });

  it('sets municipalities on initialization',inject(function(){
    expect(HomeCtrl.municipalities).toEqual(municipalities);
  }));

  it('sets municipalities with unincorporated county correctly on initialization',inject(function(){
    var municipalitesUnicorporated = [
      {
        id: 9,
        municipality_name: "Unincorporated West St. Louis County"
      },
      {
        id: 10,
        municipality_name: "Unincorporated Central St. Louis County"
      }
    ];
    inject(function(Citations,$controller,$state,$uibModal,toaster,$httpBackend){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        municipalities:municipalitesUnicorporated,
        States: states,
        $uibModal: $uibModal,
        toaster:toaster,
        Citations:Citations
      })});

      expect(HomeCtrl.municipalities.length).toEqual(2);
      expect(HomeCtrl.municipalities[0].municipality_name).toEqual("West St. Louis County");
      expect(HomeCtrl.modifiedMunicipalities.length).toEqual(1);
      expect(HomeCtrl.modifiedMunicipalities[0].municipality_name).toEqual("St. Louis County");

  }));

  it('sets states on initialization',inject(function(){
    expect(HomeCtrl.states).toEqual(states);
  }));

  it('goes to court search results page',inject(function($state){
    spyOn($state,'go');
    HomeCtrl.selectedMunicipality = {id:10, municipality:"someMuni",court_id:5};
    HomeCtrl.municipalitySelected();
    expect($state.go).toHaveBeenCalledWith('courtSearchInfo',{courtId:HomeCtrl.selectedMunicipality.court_id});
  }));

  it('initializes citationCriteria',inject(function(){
    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.TICKET_NUMBER);
    expect(HomeCtrl.citationCriteria).toEqual(citationCriteria);
  }));

  it('sets optionsSelectedMap correctly',inject(function(){
    expect(HomeCtrl.hasEverSelected).toBe(false);
    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.TICKET_NUMBER);
    expect(HomeCtrl.hasEverSelected).toBe(true);
    expect(HomeCtrl.isSelected(HomeCtrl.OptionToSelect.TICKET_NUMBER)).toBe(true);
    expect(HomeCtrl.isUnselected(HomeCtrl.OptionToSelect.DRIVER_INFO)).toBe(true);
  }));

  it('should toast an error if form not valid',inject(function(toaster){
    spyOn(toaster,'pop');
    HomeCtrl.getDOB({$valid:false});
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Please provide the required information');

  }));

  it('should open $uibModal when form submitted',inject(function($rootScope,$compile,$uibModal){
    //reference: http://stackoverflow.com/questions/21214868/mocking-modal-in-angularjs-unit-tests
    var dob = "03/17/1945";

    spyOn($uibModal, 'open').and.returnValue(fakeModal);
    spyOn(HomeCtrl,'findTicket');

    HomeCtrl.getDOB({$valid:true});
    fakeModal.close("03/17/1945");

    var expectedModalOptions = {
      templateUrl: 'views/dobPicker.html',
      controller: 'dobPickerCtrl as ctrl',
      size: 'sm'
    };
    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect(HomeCtrl.citationCriteria.dob).toEqual("03/17/1945");
    expect(HomeCtrl.findTicket).toHaveBeenCalled();

  }));

  it('should go to citationInfo if citations were found',inject(function(Citations,$rootScope,$q,$state){
    var deferred = $q.defer();
    deferred.resolve({citations:[{},{}]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($state,'go');
    HomeCtrl.findTicket();
    $rootScope.$apply();

    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations:[{},{}]});

  }));

  it('should toast message if no citations were found',inject(function(Citations,$rootScope,$q,toaster){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    spyOn(toaster, 'pop');

    HomeCtrl.findTicket();

    $rootScope.$apply();

    var homeLink = '<a href="/"><u>clicking here</u></a>';
    var noTicketsFoundMsg = 'We could not find any results for the  information you provided. It\'s possible that the municipality that issued your citation does not participate in YourSTLCourts. You may obtain information for any municipality via '+homeLink+'. Mention you\'d like them to participate in YourSTLCourts.';
    var toasterBody = {
      type: 'error',
      body: noTicketsFoundMsg,
      bodyOutputType: 'trustedHtml',
      timeout:0
    };
    HomeCtrl.findTicket();
    $rootScope.$apply();
    expect(toaster.pop).toHaveBeenCalledWith(toasterBody);

  }));

  it('should toast message if citations are unable to be looked up',inject(function(Citations,$rootScope,$q,toaster){
    var deferred = $q.defer();
    deferred.reject();
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn(toaster,'pop');
    HomeCtrl.findTicket();
    $rootScope.$apply();

    expect(toaster.pop).toHaveBeenCalledWith('error', 'Oh no! We couldn\'t get your ticket information!');
  }));

  it('should set params.citationNumber correctly',inject(function(Citations,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.TICKET_NUMBER);

    HomeCtrl.citationCriteria = {
      citationNumber: '123',
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalityNames: null,
      dob: '03/17/1990'
    };

    HomeCtrl.findTicket();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',citationNumber:'123'});
  }));

  it('should set params.licenseNumber and params.licenseState correctly',inject(function(Citations,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.DRIVER_INFO);

    HomeCtrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: 'ABC',
      licenseState: 'MO',
      firstName: null,
      lastName: null,
      municipalityNames: null,
      dob: '03/17/1990'
    };

    HomeCtrl.findTicket();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',licenseNumber: 'ABC',licenseState: 'MO'});
  }));

  it('should set params.municipalityNames and params.lastName correctly',inject(function(Citations,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.LOCATION);

    HomeCtrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: 'someLastName',
      municipalityNames: [{municipality_name:'alpha'},{municipality_name:'beta'},{municipality_name:'charlie'}],
      dob: '03/17/1990'
    };

    HomeCtrl.findTicket();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',lastName: 'someLastName',municipalityNames: ['alpha','beta','charlie']});
  }));

  it('should convert St. Louis County names in params.municipalityNames correctly',inject(function(Citations,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);

    HomeCtrl.setOptionsSelectedMap(HomeCtrl.OptionToSelect.LOCATION);

    HomeCtrl.citationCriteria = {
      citationNumber: null,
      licenseNumber: null,
      licenseState: 'MO',
      firstName: null,
      lastName: 'someLastName',
      municipalityNames: [{municipality_name:'St. Louis County'}],
      dob: '03/17/1990'
    };

    HomeCtrl.findTicket();
    expect(Citations.find).toHaveBeenCalledWith({dob:'03/17/1990',lastName: 'someLastName',municipalityNames: ['Unincorporated Central St. Louis County','Unincorporated West St. Louis County','Unincorporated North St. Louis County','Unincorporated South St. Louis County']});
  }));

  it('opens locationPicker Modal and selects municipality names',inject(function($uibModal,$q){

    spyOn($uibModal, 'open').and.returnValue(fakeModal);

    var expectedModalOptions = {
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
      backdrop: false,
      size: 'md',
      resolve: {
        municipalities: jasmine.any(Function)
      }
    };

    HomeCtrl.openMap();
    fakeModal.close(['a','b']);

    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect(HomeCtrl.citationCriteria.municipalityNames).toEqual(['a','b']);

  }));

  it('opens locationPicker Modal and initializes municipalities',inject(function($uibModal,$q){
    var actualOptions;
    spyOn($uibModal,'open').and.callFake(function(options){
      actualOptions = options;
      return fakeModal;
    })
    HomeCtrl.openMap();
    expect(actualOptions.resolve.municipalities()).toEqual(municipalities);
  }));

});
