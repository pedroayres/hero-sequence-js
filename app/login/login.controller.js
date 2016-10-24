(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('LoginCtrl', LoginCtrl);
	LoginCtrl.inject = ['ServerRequest'];
	function LoginCtrl(){
		var self = this;
		self.doLogin = doLogin;
		
    function doLogin() {
        ServerRequest.post('login', self.user).then(function (data) {
          console.log(data);
          if (data.token) {
            AuthenticationFactory.isLogged = true;
            AuthenticationFactory.user = data.user;
            AuthenticationFactory.token = data.token;
            $window.sessionStorage.token = data.token;
            $window.sessionStorage.user = JSON.stringify(data.user);
            self.msgError = '';
          } else {
            self.msgError = "A combinação de usuário e senha é inválida! Tente novamente.";
          }
        })
    }

	}
})();
