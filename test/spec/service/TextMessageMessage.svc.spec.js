describe('TextMessageMessage', function() {
  var TextMessageMessage;
  var $httpBackend;
  var httpRoot = '//localhost:8080/api';

  beforeEach(function() {
    module('yourStlCourts');

    inject(function(_TextMessageMessage_,_$httpBackend_) {
      TextMessageMessage = _TextMessageMessage_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('formats a phone number correctly',function(){
    expect(TextMessageMessage.formatPhoneNumber("ABC")).toEqual("");
    expect(TextMessageMessage.formatPhoneNumber("12345678977")).toEqual("(234) 567-8977");
  });

  it('finds phoneNumber from server', function() {
    $httpBackend.expectGET(httpRoot + '/sms/phoneNumber').respond(200);

    TextMessageMessage.getPhoneNumber();

    $httpBackend.flush();
  });

  it('broadcasts message', inject(function($rootScope){
    $spyOn($rootScope,'$broadcast');
    $httpBackend.expectGET(httpRoot + '/sms/phoneNumber').respond(200);

    TextMessageMessage.getTextMessageMessage();

    $httpBackend.flush();
    expect($rootScope.$broadcast()).toHaveBeenCalled();
  }));
});
