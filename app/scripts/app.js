'use strict';

angular.module('ghAngularApp', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'esri.map']);

angular.module('ghAngularApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl'
    });
});
