'use strict';

angular.module('yourStlCourts').controller('courtSearchInfoCtrl', function ($state, $window, courtInfo) {
  var ctrl = this;

  if(!courtInfo) {
    $state.go('home');
  } else {
    ctrl.courtInfo = courtInfo;
    ctrl.courtDirectionLink = getCourtDirectionLink(courtInfo);
  }

  function getCourtDirectionLink(courtInfo) {
    var address = courtInfo.address.replace(' ', '+');
    var city = courtInfo.city;
    var state = courtInfo.state;
    var zip = courtInfo.zip_code;
    var addressParts = [address, city, state, zip];
    return 'https://maps.google.com?saddr=Current+Location&daddr=' + addressParts.join('+');
  }

  ctrl.printCourtInfo = function () {
    $window.print();
  };

});
