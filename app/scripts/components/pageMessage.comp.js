'use strict';

angular.module('yourStlCourts').component('pageMessage', {
  templateUrl: 'views/pageMessage.html',
  controller: 'PageMessageCtrl as ctrl',
  bindings: {
    displayClass: '@',
    }
});
