describe('SMSInfo', function() {
  var SMSInfo;
  var getSpy = jasmine.createSpy('getSpy');
  var phoneNumberFilterSpy = jasmine.createSpy('phoneNumberFilterSpy');

  beforeEach(module('yourStlCourts'));

  beforeEach(function(){
    module(function($provide){
      $provide.factory('$resource',function(){
        return function $resource() {
          return {get: getSpy};
        }
      });
    });
    //This part handles the SMSInfo that is called in the app.run
    //the spy then gets redefined in the individual test to actually test functionality
    getSpy.and.returnValue({
      $promise:{
        then: function(){
          return {
            then: function(){}
          }
        }
      }
    });
  });

  beforeEach(module({phoneNumberFilter:phoneNumberFilterSpy}));

  beforeEach(function() {
    inject(function(_SMSInfo_) {
      SMSInfo = _SMSInfo_;
    });
  });

  it('formats a phone number correctly',inject(function($q, $rootScope){
    phoneNumberFilterSpy.and.returnValue("somePhoneNumber");
    var defer = $q.defer();
    defer.resolve({phoneNumber:'2345678977'});

    getSpy.and.returnValue({$promise: defer.promise});
    var smsInfoPromise = SMSInfo.getPhoneNumber();
    $rootScope.$apply();
    var result;
    smsInfoPromise.then(function(data){
      result = data;
    });
    $rootScope.$apply();

    expect(result).toEqual("somePhoneNumber");
  }));

});
