'use strict';

angular.module('yourStlCourts').controller('CourtSearchInfoCtrl', function ($state, $window, court){
  var ctrl = this;

  var j = 0;
  ctrl.courtInfo = court;

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

 function getCourtDirectionLink(courtInfo) {
      var address = courtInfo.address.replace(' ', '+');
      var city = courtInfo.city;
      var state = courtInfo.state;
      var zip = courtInfo.zip_code;
      var addressParts = [address, city, state, zip];
      return 'https://maps.google.com?saddr=Current+Location&daddr=' + addressParts.join('+');
  }

  if(!ctrl.courtInfo) {
    $state.go('home');
  } else {
        ctrl.courtDirectionLink = getCourtDirectionLink(ctrl.courtInfo);
        ctrl.courtOnMap.lat = ctrl.courtInfo.latitude;
        ctrl.courtOnMap.lng = ctrl.courtInfo.longitude;
        ctrl.courtMarkers.m1 = {lat: ctrl.courtInfo.latitude, lng: ctrl.courtInfo.longitude, message: ctrl.courtInfo.address, icon: courtDefaultIcon};

  }


  ctrl.printCourtInfo = function () {
    $window.print();
  };

});
