'use strict';

angular.module('yourStlCourts').factory('SMSInfo', function ($resource, $q) {
  var SMSInfoResource = $resource('sms/info');
  var smsInfo;

  function formatPhoneNumber(numberToFormat){
    var baseNumber = numberToFormat.replace(/(\D)/g,'').replace(/^1/,'');
    var m = baseNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? "":"("+m[1]+") "+m[2]+"-"+m[3];
  }

  function getPhoneNumber(){
    var smsInfoPromise = !!smsInfo ? $q.when(smsInfo) : SMSInfoResource.get().$promise;

    return smsInfoPromise.then(function(response){
      if(!smsInfo) {
        smsInfo = response;
      }

      return formatPhoneNumber(smsInfo.phoneNumber);
    });

  }

  var svc = {
    getPhoneNumber: getPhoneNumber
  };

  return svc;
});
