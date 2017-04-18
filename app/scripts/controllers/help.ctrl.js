'use strict';

angular.module('yourStlCourts').controller('HelpCtrl', function (faqData,supportedMunicipalities) {
  var ctrl = this;
  ctrl.faqData = faqData;
  ctrl.additionalData = [{supportedMunicipalities:supportedMunicipalities}];

});
