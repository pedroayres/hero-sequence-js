(function () {
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

		function attack(event, currentAttack) {
			if (currentAttack.isEnemy) {
				self.hero.life -= currentAttack.power;
			} else {
				self.enemy.life -= currentAttack.power;
			}
			checkEndGame();
		}

		function checkEndGame() {
      var hasWinner = false;
			if (self.hero.life <= 0) {
				self.hero.life = 0;
        hasWinner = true;
			} else if (self.enemy.life <= 0) {
				self.enemy.life = 0;
        hasWinner = 0;
			}

      if(hasWinner) {
        console.log('entrou');
        stopAttacks();
        $scope.$broadcast('endGame');
      }
		}

		function stopAttacks() {
			self.hero.stop = true;
			self.enemy.stop = true;
		}

		function heroWin() {
			stopAttacks();
		}

		function enemyWin() {
			stopAttacks();

		}
	}
})();
