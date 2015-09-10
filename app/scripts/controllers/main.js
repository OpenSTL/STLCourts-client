'use strict';

angular.module('ghAngularApp').controller('MainCtrl', function ($http, ENV) {
  //TODO: This is just temp code to verify things work
  $http.get(ENV.apiEndpoint + 'userData').then(function(){
    console.log('SUCCESS');
  }, function(){
    console.error('FAIL');
  });
});
