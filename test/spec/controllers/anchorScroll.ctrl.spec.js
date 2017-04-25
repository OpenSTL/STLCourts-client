'use strict';

describe('CitationInfoCtrl', function () {
  var AnchorScrollCtrl;
  var $anchorScroll = "myAnchorScroll"

  beforeEach(function () {
    module('yourStlCourts');

    inject(function ($httpBackend, $controller) {
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');

      AnchorScrollCtrl = $controller('AnchorScrollCtrl', {
        $anchorScroll:$anchorScroll
      });
    });
  });

  it('correctly initializes', inject(function () {
    expect(AnchorScrollCtrl.anchorScroll).toEqual("myAnchorScroll");
  }));
});
