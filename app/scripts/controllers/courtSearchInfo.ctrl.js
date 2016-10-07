'use strict';

angular.module('yourStlCourts').controller('courtSearchInfoCtrl', function ($state, $window, courtInfo) {
  var ctrl = this;
  ctrl.courtOnMap = {
        lat:51.505,
        lng:-0.09,
        zoom: 14
  };
  ctrl.courtMarkers = {};
  var courtDefaultIcon = {
    iconUrl: 'images/marker-icon.png',
    shadowUrl: 'images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  };






  if(!courtInfo) {
    $state.go('home');
  } else {
    ctrl.courtInfo = courtInfo;
    ctrl.courtDirectionLink = getCourtDirectionLink(courtInfo);
    ctrl.courtOnMap.lat = courtInfo.latitude;
    ctrl.courtOnMap.lng = courtInfo.longitude;
    ctrl.courtMarkers.m1 = {lat:courtInfo.latitude,lng:courtInfo.longitude, message: "Test",icon: courtDefaultIcon};
    //ctrl.courtMarker.lat = courtInfo.latitude;
    //ctrl.courtMarker.lng = courtInfo.longitude;
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
