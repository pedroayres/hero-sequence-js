(function(){
	'use strict';
	angular.module('heroSequenceApp').controller('FightCtrl', FightCtrl);
	FightCtrl.inject = ['$location', 'UserAuthFactory', '$scope'];
	function FightCtrl($location, UserAuthFactory, $scope) {
		var self = this;
		self.toProfile = toProfile;
		self.toExit = toExit;
	
    self.hero = {
      name: 'bartolomeo',
      action: 'waiting',
      mirror: false,
      enemy: false,
			life: 100,
			stop: false
    };

    self.enemy = {
      name: 'luffy',
      action: 'waiting',
      mirror: false,
      enemy: true,
			life: 100,
			stop: false
    };

		$scope.$on('attack', attack);

		function toProfile() {
			$location.path('/profile');
		}

		function toExit() {
			UserAuthFactory.logout();
			$location.path('/login');
		}

		function attack(event, enemyAttack) {
			if(enemyAttack) {
				self.hero.life -= 10;
			} else {
				self.enemy.life -= 10;
			}
			console.log(event, enemyAttack);
			checkEndGame();
		}

		function checkEndGame() {
			if(self.hero.life <= 0) {
				heroWin();
			} else if(self.enemy.life <= 0) {
				enemyWin();
			}
		}

		function stopAttacks() {
			self.hero.stop = true;
			self.enemy.stop = true;
			console.log('parou')
		}

		function heroWin() {
			stopAttacks();
		}

		function enemyWin() {
			stopAttacks();
		}
	}
})();
