angular.module('yourStlCourts').config(function ($httpProvider) {
  $httpProvider.interceptors.push('loadingInterceptor');
});
