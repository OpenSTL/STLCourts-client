'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;
  var states;
  var citationCriteria;

  states = ['AL'];

  municipalities = [{
    id: 9,
    latitutde: 38.7947506,
    longitude: -90.26261696,
    municipality: "Black Jack",
    address: "12500 Old Jamestown Road",
    city: "St. Louis",
    state: "MO",
    zip_code: 63033
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
    });
  });

  it('sets municipalities on initialization',inject(function(){
    expect(HomeCtrl.municipalities).toEqual(municipalities);
  }));

  it('sets states on initialization',inject(function(){
    expect(HomeCtrl.states).toEqual(states);
  }));

  it('goes to court search results page',inject(function($state){
    spyOn($state,'go');
    HomeCtrl.selectedCourt = {id:10};
    HomeCtrl.courtSelected();
    expect($state.go).toHaveBeenCalledWith('courtSearchInfo',{courtId:HomeCtrl.selectedCourt.id});
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

    var homeLink = '<a href="/"><u>clicking here</u></a>'
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

  it('opens locationPicker Modal and selects municipality names',inject(function($uibModal,$q){

    spyOn($uibModal, 'open').and.returnValue(fakeModal);

    var expectedModalOptions = {
      templateUrl: 'views/locationPickerMap.html',
      controller: 'LocationPickerMapCtrl as ctrl',
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
