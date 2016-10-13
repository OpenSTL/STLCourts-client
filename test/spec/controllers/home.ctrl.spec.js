'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller) {
      HomeCtrl = $controller('HomeCtrl', function($state,Courts,municipalities){

      });
    });
  });

  /*it('searches municipalities', function() {
    HomeCtrl.search();

    //TODO: Matt: Test something legitimate!!!
    expect(true);
  });*/
});
