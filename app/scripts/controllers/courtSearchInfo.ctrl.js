'use strict';

angular.module('yourStlCourts').controller('CourtSearchInfoCtrl', function ($state, $window, Courts, courtId){//courtInfo) {
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

  if(!courtId) {
    $state.go('home');
  } else {
    Courts.findById(courtId).then(function(court){
        ctrl.courtInfo = court;
        ctrl.courtDirectionLink = getCourtDirectionLink(court);
        ctrl.courtOnMap.lat = court.latitude;
        ctrl.courtOnMap.lng = court.longitude;
        ctrl.courtMarkers.m1 = {lat: court.latitude, lng: court.longitude, message: "Test", icon: courtDefaultIcon};
    }, function (error){
        toaster.pop('error','Could not find the court requested.');
    });
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
