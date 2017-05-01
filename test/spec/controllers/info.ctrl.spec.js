'use strict';

describe('InfoCtrl', function () {
  var InfoCtrl;
  var anchorScrollSpy = jasmine.createSpy('anchorScroll');

  beforeEach(function () {
    module('yourStlCourts');

    inject(function ($httpBackend, $controller) {
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');

      InfoCtrl = $controller('InfoCtrl', {
        $anchorScroll:anchorScrollSpy
      });
    });
  });

  it('correctly initializes', inject(function () {
    InfoCtrl.scrollTo("hi");
    expect(anchorScrollSpy).toHaveBeenCalledWith("hi");
  }));
});
