describe('Municipalities', function() {
  var Municipalities;
  var $httpBackend;
  var httpRoot = '//localhost:8080/api';

  beforeEach(function() {
    module('yourStlCourts');

    inject(function(_Municipalities_, _$httpBackend_) {
      Municipalities = _Municipalities_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('finds a municipality by id', function() {
    $httpBackend.expectGET(httpRoot + '/municipalities/5').respond(200);

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

  it('finds supported municipalities from server', function() {
    $httpBackend.expectGET(httpRoot + '/municipalities?supported=true').respond(200);

    Municipalities.findSupported(true);

    $httpBackend.flush();
  });
});
