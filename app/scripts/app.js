'use strict';

/**
 * @ngdoc overview
 * @name ghAngularApp
 * @description
 * # ghAngularApp
 *
 * Main module of the application.
 */

angular.module('ghAngularApp', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router']);

angular.module('ghAngularApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl'
    });
});
