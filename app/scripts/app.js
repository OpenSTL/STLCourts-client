'use strict';

angular.module('yourStlCourts', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate','ui-leaflet','angularMoment']);

angular.module('yourStlCourts').config(function ($stateProvider, $urlRouterProvider, $locationProvider, ENV, $httpProvider, uiSelectConfig) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl',
      resolve: {
        municipalities: function (Municipalities) {
          return Municipalities.findAll();
        },
        courts: function (Courts) {
          return Courts.findAll();
        }
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl as ctrl',
      resolve: {
        smsPhoneNumber: function (SMSInfo) {
          return SMSInfo.getPhoneNumber();
        }
      }
    })
    .state('smsInstructions', {
      url: '/smsInstructions',
      templateUrl: 'views/smsInstructions.html',
      controller: 'SMSInstructionsCtrl as ctrl',
      resolve: {
        smsPhoneNumber: function (SMSInfo) {
          return SMSInfo.getPhoneNumber();
        }
      }
    })
    .state('help', {
      url: '/help',
      templateUrl: 'views/help.html',
      controller: 'HelpCtrl as ctrl',
      resolve: {
        faqData: function ($http) {
          return $http.get('data/questionAnswers.json').then(function (data) {
            return data.data;
          });
        },
        supportedMunicipalities: function (Municipalities) {
          return Municipalities.findSupported(true);
        }
      }
    })
    .state('info', {
      url: '/info',
      controller: 'AnchorScrollCtrl as ctrl',
      templateUrl: 'views/info.html'
    })
    .state('goingToCourt', {
      url: '/goingToCourt',
      controller: 'AnchorScrollCtrl as ctrl',
      templateUrl: 'views/goingToCourt.html'
    })
    .state('legal', {
      url: '/legal',
      templateUrl: 'views/legal.html'
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'views/privacy.html'
    })
    .state('error', {
      url: '/error',
      templateUrl: 'views/error.html',
      controller: 'ErrorCtrl as ctrl',
      params: {
        error: {value: undefined}
      },
      resolve: {
        error: function ($stateParams) {
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
              throw Errors.makeError(Errors.ERROR_CODE.NOT_FOUND, "No Court was found with the url you provided.");
            });
          }
        }
      }
    })
    .state('citationInfo', {
      url: '/tickets/info',
      templateUrl: 'views/citationInfo.html',
      controller: 'CitationInfoCtrl as ctrl',
      params: {
        citations: {value: undefined}
      },
      resolve: {
        courts: function (Courts) {
          return Courts.findAll();
        },
        citations: function ($stateParams,Session,Courts) {
          var citations = Session.getLatestCitations();
          if ($stateParams.citations){
            citations = $stateParams.citations;
            Session.setLatestCitations(citations);
          }
          return citations;
        },
        faqData: function ($http) {
          return $http.get('data/questionAnswers.json').then(function (data) {
            return data.data;
          });
        },
        municipalities: function (Municipalities) {
          return Municipalities.findAll();
        }
      }
    })
    .state('citations', {
      url: '/citations/{citationId}',
      templateUrl: 'views/citations.html',
      controller: 'CitationsCtrl as ctrl',
      resolve: {
        citationId: function($stateParams) {
            return $stateParams.citationId;
          }
        }
    })
    .state('communityService', {
      url: '/communityService',
      templateUrl: 'views/communityService.html'
    });

  $httpProvider.interceptors.push(function () {
    return {
      request: function (config) {
        // prepend base url
        if (config.url.indexOf('.html') < 0 && config.url.indexOf('.json') < 0) {
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

angular.module('yourStlCourts').run(function ($rootScope, validator, validationElementModifier, errorMessageResolver,$window,$location,PageMessage, SMSInfo) {
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
    validator.setDefaultElementModifier(validationElementModifier.key);
    validator.setValidElementStyling(false);
    validator.setErrorMessageResolver(errorMessageResolver.resolve);
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    // initialise google analytics
    $window.ga('create', 'UA-94092304-1', 'auto');
    // track pageview on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
      $window.ga('send', 'pageview', $location.path());
    });
    SMSInfo.getPhoneNumber().then(function(phoneNumber){
      var message = 'Get Court Date Reminders on your<br>phone. Text "Ticket" to <b>'+phoneNumber+'</b>';
      PageMessage.start(message,"smsInstructions");
    });
  }
);
