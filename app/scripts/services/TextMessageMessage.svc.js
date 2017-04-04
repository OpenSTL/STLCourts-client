'use strict';

angular.module('yourStlCourts').factory('TextMessageMessage', function ($resource, $q,$rootScope) {
  var PhoneNumber = $resource('sms/phoneNumber');
  var phoneNumber;

  function formatPhoneNumber(numberToFormat){
    var baseNumber = numberToFormat.replace(/(^1)|(\D)/g,'');
    var m = baseNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? "":"("+m[1]+") "+m[2]+"-"+m[3];
  }

  function getTextMessageMessage(){
    var phoneNumberPromise = !!phoneNumber ? $q.when(phoneNumber) : PhoneNumber.get().$promise;

    return phoneNumberPromise.then(function(response){
      if(!phoneNumber) {
        phoneNumber = formatPhoneNumber(response.number);
      }

      var message = 'Get Court Date Reminders on your<br>phone. Text "HELP" to <b>'+phoneNumber+'</b>';

      $rootScope.$broadcast('newPageMessage',[message]);
      return "";
    });
  }

  function getPhoneNumber(){
    var phoneNumberPromise = !!phoneNumber ? $q.when(phoneNumber) : PhoneNumber.get().$promise;

    return phoneNumberPromise.then(function(response){
      if(!phoneNumber) {
        phoneNumber = formatPhoneNumber(response.number);
      }

      return phoneNumber;
    });
  }

  var svc = {
    getTextMessageMessage: getTextMessageMessage,
    getPhoneNumber: getPhoneNumber
  };

  return svc;
});
