describe('Courts', function() {
  var Courts;
  var $httpBackend;
  var httpRoot = '//localhost:8080/api';

  beforeEach(function() {
    module('yourStlCourts');

    inject(function(_Courts_, _$httpBackend_) {
      Courts = _Courts_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('finds a court by id', function() {
    $httpBackend.expectGET(httpRoot + '/courts/ABC').respond(200);

    Courts.findById("ABC");

    $httpBackend.flush();
  });

  it('finds courts from server', function() {
    $httpBackend.expectGET(httpRoot + '/courts').respond(200);

    Courts.findAll();

    $httpBackend.flush();
  });
});
