'use strict';

angular.module('ghAngularApp', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'esri.map', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate']);

angular.module('ghAngularApp').config(function($stateProvider, $urlRouterProvider, ENV, $httpProvider, uiSelectConfig) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl',
      resolve: {
        municipalities: function(Courts){
          return Courts.findAll();
        }
      }
    })
    .state('citationInfo', {
      url: '/ticketInfo',
      templateUrl: 'views/citationInfo.html',
      controller: 'citationInfoCtrl as ctrl',
      params: {
        citations: { value : undefined }
      },
      resolve: {
        citations: function($stateParams) {
          return $stateParams.citations;
        }
      }
    })
    .state('paymentOptions', {
      url: '/paymentOptions/:citationId',
      templateUrl: 'views/PaymentOptions.html',
      controller: 'PaymentOptionsCtrl as ctrl',
      resolve: {
        citation: function($stateParams, Citations) {
          return Citations.getByCitationId($stateParams.citationId);
        }
      }
    })
    .state('opportunityDetails', {
      url: '/opportunityDetails',
      templateUrl: 'views/opportunityDetails.html',
      controller: 'OpportunityDetailsCtrl as ctrl'
    })
    .state('sponsorLogin', {
      url: '/sponsorLogin',
      templateUrl: 'views/sponsorLogin.html',
      controller: 'SponsorLoginCtrl as ctrl'
    })
    .state('sponsorMgmt', {
      url: '/sponsorMgmt',
      templateUrl: 'views/sponsorManagement.html',
      controller: 'SponsorMgmtCtrl as ctrl',
      resolve: {
        opportunities: function(Opportunities, Auth){
          return Opportunities.findBySponsorId(Auth.getAuthenticatedSponsor().id);
        },
        courts: function(Courts){
          return Courts.findAll();
        }
      }
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
