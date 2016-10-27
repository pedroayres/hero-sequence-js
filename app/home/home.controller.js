(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('HomeCtrl', HomeCtrl);
	HomeCtrl.inject = ['$location'];
	function HomeCtrl($location) {
		var self = this;
		self.toProfile = toProfile;
	

		function toProfile() {
			$location.path('/profile');
		}
	}
})();
