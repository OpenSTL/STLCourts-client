'use strict';

describe('CitationsCtrl', function () {

  var CitationsCtrl;
  var citationId = 5;
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

    inject(function($controller, toaster,$state,Citations,$httpBackend,$rootScope) {
      CitationsCtrl = $controller('CitationsCtrl', {
        Citations:Citations,
        citationId:citationId,
        $state:$state,
        toaster: toaster,
        $rootScope: $rootScope,
        Errors:Errors
      });
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');
    });
  });

  it('initializes variables on init',function(){
    expect(CitationsCtrl.dob).toBeNull();
    expect(CitationsCtrl.dobValid).toBe(false);
    expect(CitationsCtrl.dobOver18).toBe(false);
  });

  it('goes to citationInfo page',inject(function(Citations,$rootScope,$q,$state){
    var deferred = $q.defer();
    deferred.resolve([{},{}]);
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($state,'go');
    CitationsCtrl.dobValid = true;
    CitationsCtrl.dobOver18 = true;
    CitationsCtrl.dob = "myDate";

    CitationsCtrl.viewCitation();
    $rootScope.$apply();

    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations:[{},{}], dob: 'myDate'});
  }));

  it('should broadcast an error when no citations are found',inject(function(Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve([]);
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($rootScope,'$broadcast').and.callThrough();

    CitationsCtrl.dobValid = true;
    CitationsCtrl.dobOver18 = true;
    CitationsCtrl.dob = "myDate";

    CitationsCtrl.viewCitation();
    $rootScope.$apply();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('stlCourtsCustomError',"someError");

  }));

  it('shows error when saving invalid date', inject(function(toaster) {
    spyOn(toaster, 'pop');
    CitationsCtrl.dobValid = false;
    CitationsCtrl.viewCitation();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid date of birth.');
  }));

  it('shows error when saving date for under 18 year old', inject(function(toaster) {
    spyOn(toaster, 'pop');
    CitationsCtrl.dobValid = true;
    CitationsCtrl.dobOver18 = false;
    CitationsCtrl.viewCitation();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Sorry, you must be at least 18 years old to use this site.');
  }));
});
