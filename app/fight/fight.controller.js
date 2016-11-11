(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('FightCtrl', FightCtrl);
	FightCtrl.inject = ['$location', 'UserAuthFactory'];
	function FightCtrl($location, UserAuthFactory) {
		var self = this;
		self.toProfile = toProfile;
		self.toExit = toExit;
	
    self.hero = {
      name: 'bartolomeo',
      action: 'waiting',
      mirror: false,
      enemy: false
    };

    self.enemy = {
      name: 'luffy',
      action: 'waiting',
      mirror: false,
      enemy: true
    };


		function toProfile() {
			$location.path('/profile');
		}

		function toExit() {
			UserAuthFactory.logout();
			$location.path('/login');
		}

	}
})();
