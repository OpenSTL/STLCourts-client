'use strict';

angular.module('yourStlCourts').provider('loadingInterceptor', function () {

  var ignoreURLs = ['.html'];

  this.$get = ['$q', '$injector', '$timeout', function ($q, $injector, $timeout) {

    var notificationChannel;
    var $http;

    function init() {
      notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
      $http = $http || $injector.get('$http');
    }

    function ignoreUrl(config) {
      return ignoreURLs.some(function(urlToIgnore) {
        return config.url.indexOf(urlToIgnore) !== -1;
      });
    }

    function inspectRequest(config) {
      init();
      if (!ignoreUrl(config)) {
        notificationChannel.requestStarted();
      }
      return config;
    }

    function inspectResponse(response) {
      init();
      var activeCount = $http.pendingRequests.reduce(function(count, item) {
        if (!ignoreUrl(item)) {
          return count+1;
        }
        return count;
      } ,0);
      if (activeCount === 0) {
        notificationChannel.requestEnded();
      }
      return response;
    }

    return {
      request : inspectRequest,
      response: inspectResponse,
      responseError: function(response) {
        return $q.reject(inspectResponse(response));
      },

      //TODO: Consider widespread repercussions,
      //TODO: used currently to avoid loading indicator when doing extract since it takes forever.
      clearPendingRequests: function(){
        $timeout(function(){
          $http = $http || $injector.get('$http');
          $http.pendingRequests = [];

          notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
          // send a notification requests are complete
          notificationChannel.requestEnded();
        }, 0);
      }
    };
  }];
});
