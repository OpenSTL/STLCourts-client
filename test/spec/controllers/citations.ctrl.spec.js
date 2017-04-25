'use strict';

describe('CitationsCtrl', function () {

  var CitationsCtrl;
  var citationId = 5;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, toaster,$state,Citations,$httpBackend) {
      CitationsCtrl = $controller('CitationsCtrl', {
        Citations:Citations,
        citationId:citationId,
        $state:$state,
        toaster: toaster
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

    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations:[{},{}]});
  }));

  it('should toast an error when no citations are found',inject(function(toaster,Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve([]);
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn(toaster,'pop');

    var homeLink = '<a href="/"><u>clicking here</u></a>';
    var noTicketsFoundMsg = 'We could not find any results for the information you provided. Because only recent court dates are in our system, you may still have pending court cases, please contact the court for more information.<br>It\'s also possible that the municipality that issued your citation does not participate in YourSTLCourts. You may obtain information for any municipality via '+homeLink+'. Mention you\'d like them to participate in YourSTLCourts.';
    var toasterBody = {
      type: 'error',
      body: noTicketsFoundMsg,
      bodyOutputType: 'trustedHtml',
      timeout:10000
    };

    CitationsCtrl.dobValid = true;
    CitationsCtrl.dobOver18 = true;
    CitationsCtrl.dob = "myDate";

    CitationsCtrl.viewCitation();
    $rootScope.$apply();
    expect(toaster.pop).toHaveBeenCalledWith(toasterBody);
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
