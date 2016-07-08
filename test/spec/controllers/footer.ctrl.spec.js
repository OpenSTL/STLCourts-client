'use strict';

describe('FooterCtrl', function() {
  var FooterCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller) {
      FooterCtrl = $controller('FooterCtrl', {});
    });
  });

  it('indicates should collapse options', function() {
    var shouldCollapseOptions = FooterCtrl.collapseOptions();

    expect(shouldCollapseOptions).toBe(false);
  });
});
