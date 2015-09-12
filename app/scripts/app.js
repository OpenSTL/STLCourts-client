'use strict';

angular.module('ghAngularApp', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'esri.map', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate']);

angular.module('ghAngularApp').config(function($stateProvider, $urlRouterProvider, ENV, $httpProvider, uiSelectConfig) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl'
    });

  $httpProvider.interceptors.push(function(){
    return {
      request: function(config) {
        // prepend base url
        if(config.url.indexOf('.html') < 0) {
          config.url = ENV.apiEndpoint + config.url;
        }
        return config;
      }
    };
  });

  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;
  uiSelectConfig.closeOnSelect = true;
  uiSelectConfig.searchEnabled = true;
});

angular.module('ghAngularApp').run(function (validator, validationElementModifier, errorMessageResolver) {
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
    validator.setDefaultElementModifier(validationElementModifier.key);
    validator.setValidElementStyling(false);
    validator.setErrorMessageResolver(errorMessageResolver.resolve);
  }
);
