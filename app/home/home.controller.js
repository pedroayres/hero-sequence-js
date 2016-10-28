(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('HomeCtrl', HomeCtrl);
	HomeCtrl.inject = ['$location', 'UserAuthFactory'];
	function HomeCtrl($location, UserAuthFactory) {
		var self = this;
		self.toProfile = toProfile;
		self.toExit = toExit;
	

		function toProfile() {
			$location.path('/profile');
		}

		function toExit() {
			UserAuthFactory.logout();
			$location.path('/login');
		}
	}
})();
