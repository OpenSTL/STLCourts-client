'use strict';

angular.module('ghAngularApp').factory('API', function ($http, ENV) {
  function get(URI){
    return $http.get(ENV.apiEndpoint + URI);
  }

  function post(URI){
    return $http.post(ENV.apiEndpoint + URI);
  }

  function put(URI){
    return $http.put(ENV.apiEndpoint + URI);
  }

  function del(URI){
    return $http.delete(ENV.apiEndpoint + URI);
  }

  var svc = {
    'get': get,
    post: post,
    put: put,
    del: del
  };

  return svc;
});
