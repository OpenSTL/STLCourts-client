describe('SMSInfo', function() {
  var SMSInfo;
  var $httpBackend;
  var httpRoot = '//localhost:8080/api';
  var getSpy = jasmine.createSpy('getSpy');
  var resource;

  beforeEach(module('yourStlCourts'));

  beforeEach(function(){
    module(function($provide) {
      $provide.value('PageMessage',
        {
          setSMSInformationalMessage: function () {},
          start: function () {}
        });

    });
  });

  beforeEach(function(){
    module(function($provide){
      $provide.factory('$resource',function(){
        return function $resource() {
          return {get: getSpy};
        }
      });
    });
  });

  beforeEach(function() {
    inject(function(_SMSInfo_,_$httpBackend_) {
      SMSInfo = _SMSInfo_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('formats a phone number correctly',inject(function($q, $rootScope){
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

    expect(result).toEqual("(234) 567-8977");
  }));

});
