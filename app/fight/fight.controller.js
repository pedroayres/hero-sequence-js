(function () {
	'use strict';
	angular.module('heroSequenceApp').controller('FightCtrl', FightCtrl);
	FightCtrl.inject = ['$location', 'UserAuthFactory', '$scope', 'SelectedHeroService', 'SelectedScenarioService', '$timeout', 'EnemyFactory'];
	function FightCtrl($location, UserAuthFactory, $scope, SelectedHeroService, SelectedScenarioService, $timeout, EnemyFactory) {
		// Private variables
		var self = this;
		var timeToHeroAttack = 5;

		// Public variables
		self.selectedScenario = SelectedScenarioService.getScenario().path || 'images/scenario_3.gif';
		self.waitingAttack = true;
		self.typedSequence = '';
		self.currentAttack = {};

		// Public methos
		self.toProfile = toProfile;
		self.toExit = toExit;
		self.attackTime = timeToHeroAttack;

		self.hero = SelectedHeroService.getHero();
		self.enemy = EnemyFactory.generate();

		// Watchers and call functions
		$scope.$on('attack', attack);
		angular.element(document).on('keydown', dispatchMoviment);
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
			$timeout(function () {
				self.attackTime -= 1;
				if (self.attackTime === 0) {
					self.hero.stop = true;
					enemyAttack();
				} else {
					heroAttackTime();
				}
			}, 1000);
		}

		function enemyAttack() {
			self.typedSequence = '';
			self.waitingAttack = true;
			self.sequence = '';
			self.currentAttack = {};
			$timeout(function () {
				$scope.$broadcast('enemyAttack');
				$timeout(function () {
					if (self.hero.life > 0 && self.enemy.life > 0) {
						self.attackTime = timeToHeroAttack;
						self.hero.stop = false;
						heroAttackTime();
					}
				}, 4000);
			}, 2000);
		}

		function dispatchMoviment(event) {
			if (!self.hero.stop && self.hero.life > 0 && self.waitingAttack) {
				showAttackSequence(event.keyCode);
			} else if (!self.waitingAttack) {
				checkSequence(event.key);
			}
		}

		function showAttackSequence(keyCode) {
			self.hero.attacks.forEach(function (attack) {
				if (attack.keyCode === keyCode) {
					self.waitingAttack = false;
					self.currentAttack = attack;
					generateSequence(attack.power);
				}
			});
		}

		function generateSequence(power) {
			self.sequence = stringGen(power / 10 * 4);
		}

		function checkSequence(letter) {
			self.typedSequence += letter;
			if(self.typedSequence.trim() == self.sequence.trim()) {
				$scope.$broadcast('attackHero', self.currentAttack.name, self.currentAttack.power);
			}
			
		}

		function stringGen(len) {
			var text = " ";
			var charset = "abcdefghijklmnopqrstuvwxyz";
			for (var i = 0; i < len; i++) {
				text += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			return text;
		}

		


	}
})();
