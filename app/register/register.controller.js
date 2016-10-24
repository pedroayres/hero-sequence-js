(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('RegisterCtrl', RegisterCtrl);
	RegisterCtrl.inject = ['ServerRequest', '$location'];
	function RegisterCtrl(ServerRequest, $location){
		var self = this;
    self.goToLogin = goToLogin;
    self.registerFields = [{
        field: "name",
        type: "text",
        placeholder: "Digite o seu nome"
    },{
        field: "email",
        type: "text",
        placeholder: "Digite seu email"
    },{
        field: "password",
        type: "password",
        placeholder: "Digite sua senha"
    },{
        field: "birthdate",
        type: "text",
        placeholder: "Digite seu aniversário"
    },{
        field: "nickname",
        type: "text",
        placeholder: "Digite seu nick"
    }];

    function goToLogin() {
      $location.path( "/login" );
    }

	}
})();
