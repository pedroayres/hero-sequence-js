(function () {
  'use strict';
  angular.module('heroSequenceApp').controller('LoginCtrl', LoginCtrl);
  LoginCtrl.inject = ['ServerRequest', '$location', 'AuthenticationFactory', '$window'];
  function LoginCtrl(ServerRequest, $location, AuthenticationFactory, $window) {
    var self = this;
    self.doLogin = doLogin;
    self.goToRegister = goToRegister;

    self.alertStatus = "";
    self.alertMessage = "";

    self.loginFields = [{
      name: "login",
      type: "text",
      placeholder: "Digite o seu login"
    }, {
      name: "password",
      type: "password",
      placeholder: "Digite sua senha"
    }];

    function doLogin() {
      ServerRequest.post('login', self.user).then(function (response) {
        console.log(response);
        if(response.token) {
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = response.user;
          AuthenticationFactory.token = response.token;
          $window.sessionStorage.token = response.token;
          $window.sessionStorage.user = JSON.stringify(response.user);
          goToHome();
        } else {
          self.alertStatus = "alert-danger";
          self.alertMessage = "Usuário ou senha incorreto, tente novamente!";
        }
        
      });
    }

    function goToRegister() {
      $location.path("/register");
    }

    function goToHome() {
      $location.path("/home");
    }

  }
})();
