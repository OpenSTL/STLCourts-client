'use strict';

angular.module('yourStlCourts', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'esri.map', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate','ui-leaflet']);

angular.module('yourStlCourts').config(function($stateProvider, $urlRouterProvider, ENV, $httpProvider, uiSelectConfig) {
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
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    })
    .state('help', {
      url: '/help',
      templateUrl: 'views/help.html'
    })
    .state('info', {
      url: '/info',
      templateUrl: 'views/info.html'
    })
    .state('legal', {
          url: '/legal',
          templateUrl: 'views/legal.html'
    })
    .state('privacy', {
          url: '/privacy',
          templateUrl: 'views/privacy.html'
    })
    .state('ticketSearch', {
      url: '/tickets/search',
      templateUrl: 'views/ticketSearch.html',
      controller: 'ticketSearchCtrl as ctrl',
      resolve: {
        municipalities: function(Courts){
          return Courts.findAll();
        }
      }
    })
    .state('courtSearchInfo', {
      url: '/courtSearch/info',
      templateUrl: 'views/courtSearchInfo.html',
      controller: 'courtSearchInfoCtrl as ctrl',
      params: {
        courtInfo: {value: undefined}
      },
      resolve: {
        courtInfo : function($stateParams){
          return $stateParams.courtInfo;
        }
      }
    })
    .state('citationInfo', {
      url: '/tickets/info',
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

angular.module('yourStlCourts').run(function (validator, validationElementModifier, errorMessageResolver) {
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
    validator.setDefaultElementModifier(validationElementModifier.key);
    validator.setValidElementStyling(false);
    validator.setErrorMessageResolver(errorMessageResolver.resolve);
  }
);
