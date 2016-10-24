(function(){
  'use strict';
  angular
    .module('heroSequenceApp', [
      'ngAnimate',
      'ngRoute'
    ])

    .config(configProvider)
    .config(router)
    .run(runAuth);

    function configProvider($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With']; 
    }

    function router($routeProvider, $httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
      $routeProvider
        .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/register', {
          templateUrl: 'register/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/select-scenario', {
          templateUrl: 'select-scenario/select-scenario.html',
          controller: 'SelectScenarioCtrl',
          controllerAs: 'scenario'
        })
        .when('/home', {
          templateUrl: 'home/home.html',
          controller: 'HomeCtrl',
          // access: {
          //   requiredLogin: true
          // },
          controllerAs: 'home'

        })
        .otherwise({
          redirectTo: '/login'
        });
    }

    function runAuth($rootScope, $window, $location, AuthenticationFactory) {
      // when the page refreshes, check if the user is already logged in
      AuthenticationFactory.check();
     
      $rootScope.$on('$routeChangeStart', routeChangeStart);
      $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

      function routeChangeStart(event, nextRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
          $location.path('/login');
        } else {
          // check if user object exists else fetch it. This is incase of a page refresh
          if (!AuthenticationFactory.user) {
            AuthenticationFactory.user = $window.sessionStorage.user;
          }
          if (!AuthenticationFactory.userRole) {
            AuthenticationFactory.userRole = $window.sessionStorage.userRole;
          }

        }
      }
     
      function routeChangeSuccess() {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged && $location.path() === '/login') {
          $location.path('/painel');
        }
      }
    }


})();