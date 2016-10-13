(function(){
  'use strict';
  angular
    .module('heroSequenceApp', [
      'ngAnimate',
      'ngRoute'
    ])

    .config(router)

    function router($routeProvider) {

      $routeProvider
        .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }

})();