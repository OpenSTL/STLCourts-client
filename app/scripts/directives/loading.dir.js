'use strict';
angular.module('yourStlCourts').directive('loading', function (requestNotificationChannel) {
  return {
    restrict: 'A',
    link: function ($scope, $element) {
      // hide the element initially
      $element.hide();

      var startRequestHandler = function () {
        // got the request start notification, show the element
        if (!$element.is(':visible')) {
          $element.stop();
          $element.css({
            'height': $(document).height(),
            'width': $(document).width()
          });
          $element.find('.loadingWindowSize').css({
            'top': $(window).scrollTop(),
            left: $(window).scrollLeft(),
            'height': $(window).height(),
            'width': $(window).width()
          });
          $element.show();
        }
      };

      var endRequestHandler = function () {
        // got the request start notification, show the element
        $element.stop().hide();
      };

      requestNotificationChannel.onRequestStarted($scope, startRequestHandler);
      requestNotificationChannel.onRequestEnded($scope, endRequestHandler);
    }
  };
});
