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

  it('initializes creates a supported municipalities list',function(){
    var list = NoCitationsFoundCtrl.getSupportedMunicipalitiesList();
    expect(list).toEqual("muni1, muni2");
  });

});
