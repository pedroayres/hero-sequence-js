(function () {
  'use strict';
  angular.module('heroSequenceApp').factory('AuthenticationFactory', AuthenticationFactory);
  AuthenticationFactory.$inject = ['$window'];

  function AuthenticationFactory($window) {
    var auth = {
      isLogged: false,
      token: '',
      user: '',
      check: function () {
        if ($window.sessionStorage.token && $window.sessionStorage.user) {
          var userCached = '';
          if (typeof ($window.sessionStorage.user) === 'string') {
            userCached = JSON.parse($window.sessionStorage.user);
          } else {
            userCached = $window.sessionStorage.user;
          }

          this.isLogged = true;
          this.user = userCached;
          this.token = $window.sessionStorage.token;
        } else {
          this.isLogged = false;
          this.token = '';
          delete this.token;
          delete this.user;
        }
      }
    }

    return auth;
  };

})();
