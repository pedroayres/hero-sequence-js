(function () {
  'use strict';
  angular.module('heroSequenceApp').factory('UserAuthFactory', UserAuthFactory);
  UserAuthFactory.$inject = ['$window', '$location', '$http', 'AuthenticationFactory'];

  function UserAuthFactory($window, $location, $http, AuthenticationFactory) {
    return {
      logout: function () {

        if (AuthenticationFactory.isLogged) {

          AuthenticationFactory.isLogged = false;
          delete AuthenticationFactory.user;
          delete AuthenticationFactory.userRole;
          delete AuthenticationFactory.userInfo;

          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete $window.sessionStorage.userRole;
          delete $window.sessionStorage.userInfo;
          $location.path("/login");
        }

      }
    }
  };

})();