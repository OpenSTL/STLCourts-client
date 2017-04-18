'use strict';

angular.module('yourStlCourts').factory('SMSInfo', function ($resource, $q, phoneNumberFilter) {
  var SMSInfoResource = $resource('sms/info');
  var smsInfo;

  function getPhoneNumber(){
    var smsInfoPromise = !!smsInfo ? $q.when(smsInfo) : SMSInfoResource.get().$promise;

    return smsInfoPromise.then(function(response){
      if(!smsInfo) {
        smsInfo = response;
      }

      return phoneNumberFilter(smsInfo.phoneNumber);
    });

  }

  var svc = {
    getPhoneNumber: getPhoneNumber
  };

  return svc;
});
