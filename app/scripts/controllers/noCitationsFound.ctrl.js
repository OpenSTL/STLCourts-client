'use strict';

angular.module('yourStlCourts').controller('NoCitationsFoundCtrl', function (supportedMunicipalities) {
  var ctrl = this;
  ctrl.supportedMunicipalities = supportedMunicipalities;
});
