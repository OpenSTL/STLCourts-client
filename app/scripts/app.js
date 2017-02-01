'use strict';

angular.module('yourStlCourts', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate','ui-leaflet']);

angular.module('yourStlCourts').config(function($stateProvider, $urlRouterProvider, $locationProvider, ENV, $httpProvider, uiSelectConfig) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl',
      resolve: {
        municipalities: function(Municipalities){
          return Municipalities.findAll();
        }
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl as ctrl'
    })
    .state('help', {
      url: '/help',
      templateUrl: 'views/help.html',
      controller: 'HelpCtrl as ctrl',
      resolve: {
        faqData: function($http) {
          return $http.get('data/questionAnswers.json').then(function(data){
            return data.data;
          });
        }
      }
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
    .state('error',{
      url:'/error',
      templateUrl: 'views/error.html',
      controller:'ErrorCtrl as ctrl',
      params: {
        error: { value : undefined }
      },
      resolve: {
        error: function($stateParams) {
          return $stateParams.error;
        }
      }
    })
    .state('courtSearchInfo', {
      url: '/courts/{courtId}',
      templateUrl: 'views/courtSearchInfo.html',
      controller: 'CourtSearchInfoCtrl as ctrl',
      params: {
        court: {value: undefined}
      },
      resolve: {
        court: function ($stateParams, Courts, Errors) {
          if (!$stateParams.courtId) {
            throw Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No Court was found with the url you provided.");
          } else {
            return Courts.findById($stateParams.courtId).catch(function () {
              throw Errors.makeError(Errors.ERROR_CODE.NOT_FOUND, "No Court was found with the url you provided.");            })
          }
        }
      }
    })
    .state('citationInfo', {
      url: '/tickets/info',
      templateUrl: 'views/citationInfo.html',
      controller: 'CitationInfoCtrl as ctrl',
      params: {
        citations: { value : undefined }
      },
      resolve: {
        citations: function($stateParams) {
          return $stateParams.citations;
        },
        faqData: function($http) {
          return $http.get('data/questionAnswers.json').then(function(data){
            return data.data;
          });
        },
        paymentData: function($http){
          return $http.get('data/paymentWebsites.json').then(function(data){
            return data.data;
          });
        }
      }
    })
    .state('paymentOptions', {
      url: '/paymentOptions/{citation}/{dob:.*}',
      templateUrl: 'views/citationInfo.html',
      controller: 'CitationInfoCtrl as ctrl',
      resolve: {
        citations: function($stateParams, Citations,Errors) {
          if (!$stateParams.citation || !$stateParams.dob){
            throw Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No tickets were found with the information provided.");
          }else{
            var params = {
              dob: $stateParams.dob,
              citationNumber:$stateParams.citation
            };
            return Citations.find(params).then(function(result){
              if(result.citations.length <= 0) {
                throw Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No tickets were found with the information provided.");
              }
              return result.citations;
            });
          }
        },
        faqData: function($http) {
          return $http.get('data/questionAnswers.json').then(function(data){
            return data.data;
          });
        },
        paymentData: function($http){
          return $http.get('data/paymentWebsites.json').then(function(data){
            return data.data;
          });
        }
      }
    })
    .state('communityService',{
      url: '/communityService',
      templateUrl: 'views/communityService.html'
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
        if(config.url.indexOf('.html') < 0 && config.url.indexOf('.json') < 0) {
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

angular.module('yourStlCourts').run(function ($rootScope,validator, validationElementModifier, errorMessageResolver) {
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
    validator.setDefaultElementModifier(validationElementModifier.key);
    validator.setValidElementStyling(false);
    validator.setErrorMessageResolver(errorMessageResolver.resolve);
    $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }
);
