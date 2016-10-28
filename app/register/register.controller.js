(function () {
  'use strict';
  angular.module('heroSequenceApp').controller('RegisterCtrl', RegisterCtrl);
  RegisterCtrl.inject = ['ServerRequest', '$location'];
  function RegisterCtrl(ServerRequest, $location) {
    var self = this;
    self.goToLogin = goToLogin;
    self.doRegister = doRegister;
    self.alertStatus = "";
    self.alertMessage = "";
    self.user = {};
    self.registerFields = [{
      name: "login",
      type: "text",
      placeholder: "Digite o seu login"
    }, {
      name: "name",
      type: "text",
      placeholder: "Digite seu nome"
    }, {
      name: "email",
      type: "text",
      placeholder: "Digite seu email"
    }, {
      name: "password",
      type: "password",
      placeholder: "Digite sua senha"
    }, {
      name: "birthdate",
      type: "text",
      placeholder: "Digite seu aniversário"
    }, {
      name: "nickname",
      type: "text",
      placeholder: "Digite seu nick"
    }];

    function goToLogin() {
      $location.path("/login");
    }

    function doRegister() {
      ServerRequest.post('user', self.user).then(function(res) {
        if(res._id) {
          self.alertStatus = "alert-success";
          self.alertMessage = "Usuário cadastrado com sucesso";
          setTimeout(function() {
            goToLogin();
          }, 3000);
        } else if(res.status == 409){
          self.alertStatus = "alert-danger";
          self.alertMessage = "Usuário já existe cabron!";
        } else {
          console.log(res)
          self.alertStatus = "alert-danger";
          self.alertMessage = "Ops! Algo errado aconteceu, tente novamente";
        }
      })
    }

  }
})();
