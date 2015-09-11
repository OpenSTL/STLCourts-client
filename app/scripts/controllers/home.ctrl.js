'use strict';

angular.module('ghAngularApp').controller('HomeCtrl', function (API) {
  //TODO: This is just temp code to verify things work
  API.get('userData').then(function(){
    console.log('SUCCESS');
  }, function(){
    console.error('FAIL');
  });
});
