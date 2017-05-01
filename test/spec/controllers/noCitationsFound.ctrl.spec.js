'use strict';

describe('NoCitationsFoundCtrl', function () {

  var NoCitationsFoundCtrl;
  var supportedMunicipalities = [
    {name: "muni1"},
    {name: "muni2"}
  ];

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller,$httpBackend) {
      NoCitationsFoundCtrl = $controller('NoCitationsFoundCtrl', {
        supportedMunicipalities:supportedMunicipalities
      });
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');
    });
  });

  it('initializes correctly',function(){
    expect(NoCitationsFoundCtrl.supportedMunicipalities).toEqual(supportedMunicipalities);
  });
});
