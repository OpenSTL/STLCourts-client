'use strict';

describe('GoingToCourtCtrl', function () {
  var GoingToCourtCtrl;
  var anchorScrollSpy = jasmine.createSpy('anchorScroll');

  beforeEach(function () {
    module('yourStlCourts');

    inject(function ($httpBackend, $controller) {
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');

      GoingToCourtCtrl = $controller('GoingToCourtCtrl', {
        $anchorScroll:anchorScrollSpy
      });
    });
  });

  it('correctly initializes', inject(function () {
    GoingToCourtCtrl.scrollTo("hi");
    expect(anchorScrollSpy).toHaveBeenCalledWith("hi");
  }));
});
