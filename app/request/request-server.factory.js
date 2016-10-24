(function() {
  'use strict';
  angular.module('heroSequenceApp').factory('ServerRequest', ServerRequest);
  ServerRequest.$inject = ['$http', 'URL'];

  function ServerRequest($http, URL) {
    var request = {
      get: get,
      post: post,
      put: put
    };

    return request;

    function get(route) {
      return $http.get(URL + '/' + route)
        .then(success);
    }

    function post(route, data) {
      return $http({
          method: 'POST',
          url: URL + '/' + route,
          data: data,
          config: {}
        })
        .then(success)
        .catch(error);
    }

    function put(route, data) {
      return $http({
          method: 'PUT',
          url: URL + '/' + route,
          data: data,
          config: {}
        })
        .then(success)
        .catch(error);   
    }

    function error(response) {
      return response;
    }

    function success(response) {
      return response.data;
    }

  }

})();