'use strict';

angular.module('yourStlCourts').factory('requestNotificationChannel', function ($rootScope) {
  // private notification messages
  var _START_REQUEST_ = '_START_REQUEST_';
  var _END_REQUEST_ = '_END_REQUEST_';

  // publish start request notification
  var requestStarted = function () {
    $rootScope.$broadcast(_START_REQUEST_);
  };

  // publish end request notification
  var requestEnded = function () {
    $rootScope.$broadcast(_END_REQUEST_);
  };

  // subscribe to start request notification
  var onRequestStarted = function ($scope, handler) {
    $scope.$on(_START_REQUEST_, function () {
      handler();
    });
  };

  // subscribe to end request notification
  var onRequestEnded = function ($scope, handler) {
    $scope.$on(_END_REQUEST_, function () {
      handler();
    });
  };

  return {
    requestStarted: requestStarted,
    requestEnded: requestEnded,
    onRequestStarted: onRequestStarted,
    onRequestEnded: onRequestEnded
  };
});
