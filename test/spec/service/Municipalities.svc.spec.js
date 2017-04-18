describe('Municipalities', function() {
  var Municipalities;
  var $httpBackend;
  var httpRoot = '//localhost:8080/api';

  beforeEach(module('yourStlCourts'));

  beforeEach(function(){
    module(function($provide) {
      $provide.value('SMSInfo',
        {
          getPhoneNumber: function () {
            return {
              then:function(){}
            };
          }
        });
    });
  });

  beforeEach(function() {
    inject(function(_Municipalities_, _$httpBackend_) {
      Municipalities = _Municipalities_;
      $httpBackend = _$httpBackend_;
    });
    $httpBackend.whenGET(/info/).respond(200);
  });

  it('finds a municipality by id', function() {
    $httpBackend.expectGET('//localhost:8080/api/municipalities/5').respond(200,'');

    Municipalities.findById(5);

    $httpBackend.flush();
  });

  it('finds municipalities by court id id', function() {
    $httpBackend.expectGET(httpRoot + '/courts/5/municipalities').respond(200);

    Municipalities.findByCourtId(5);

    $httpBackend.flush();
  });

  it('finds municipalities from server', function() {
    $httpBackend.expectGET(httpRoot + '/municipalities').respond(200);

    Municipalities.findAll();

    $httpBackend.flush();
  });
});
