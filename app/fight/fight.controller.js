(function () {
	'use strict';
	angular.module('heroSequenceApp').controller('FightCtrl', FightCtrl);
	FightCtrl.inject = ['$location', 'UserAuthFactory', '$scope', 'SelectedHeroService', 'SelectedScenarioService', '$timeout', 'EnemyFactory'];
	function FightCtrl($location, UserAuthFactory, $scope, SelectedHeroService, SelectedScenarioService, $timeout, EnemyFactory) {
    // Private variables
		var self = this;
    var timeToHeroAttack = 5; 

    // Public variables
		self.toProfile = toProfile;
		self.toExit = toExit;
    self.attackTime = timeToHeroAttack;
		self.selectedScenario = SelectedScenarioService.getScenario().path || 'images/scenario-1.jpg';
		self.hero = SelectedHeroService.getHero();
		self.enemy = EnemyFactory.generate();

    // Watchers and call functions
		$scope.$on('attack', attack);
    heroAttackTime();

    // Functions
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
				hasWinner = true;
			}

			if (hasWinner) {
				stopAttacks();
				$scope.$broadcast('endGame');
			}
		}

		function stopAttacks() {
			self.hero.stop = true;
			self.enemy.stop = true;
		}

    function heroAttackTime() {
      $timeout(function(){
        self.attackTime -= 1;
        if(self.attackTime === 0) {
          self.hero.stop = true;
          enemyAttack();
        } else {
          heroAttackTime();
        }
      }, 1000);
    }

    function enemyAttack() {
      $timeout(function(){
        $scope.$broadcast('enemyAttack');
        $timeout(function(){
          if(self.hero.life > 0 && self.enemy.life > 0) {
            self.attackTime = timeToHeroAttack;
            self.hero.stop = false;
            heroAttackTime();
          }
        }, 4000); 
      }, 2000); 
    }

	}
})();
