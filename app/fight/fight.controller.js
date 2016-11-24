(function () {
	'use strict';
	angular.module('heroSequenceApp').controller('FightCtrl', FightCtrl);
	FightCtrl.inject = ['$location', 'UserAuthFactory', '$scope', 'SelectedHeroService', 'SelectedScenarioService', '$timeout', 'EnemyFactory'];
	function FightCtrl($location, UserAuthFactory, $scope, SelectedHeroService, SelectedScenarioService, $timeout, EnemyFactory) {
		// Private variables
		var self = this;
		var timeToHeroAttack = 7;

		// Public variables
		function init() {
			self.selectedScenario = SelectedScenarioService.getScenario().path || 'images/scenario_3.gif';
			self.waitingAttack = true;
			self.typedSequence = '';
			self.statusFight = '';
			self.currentAttack = {};
			self.hero = SelectedHeroService.getHero();
			self.enemy = EnemyFactory.generate();
      self.statusFight = '';
      self.attackTime = timeToHeroAttack;
      self.hero.life = 100;
      self.enemy.life = 100;
		}

		// Public methos
		self.toHome = toHome;
		self.toExit = toExit;
    self.init = init;

		// Watchers and call functions
		$scope.$on('attack', attack);
		angular.element(document).on('keydown', dispatchMoviment);
    init();
		heroAttackTime();

		// Functions
		function toHome() {
			$location.path('/home');
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
				self.statusFight = 'Você perdeu';
			} else if (self.enemy.life <= 0) {
				self.enemy.life = 0;
				hasWinner = true;
				self.statusFight = 'Você ganhou';
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
			} else if (!self.waitingAttack && event.keyCode !== 27) {
				checkSequence(event.key);
			} else if(event.keyCode == 27) {
				backToSelectAttack();
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
				backToSelectAttack();
			}
			
		}

		function stringGen(len) {
			var text = " ";
			var charset = "abcdfghijklmnoprstuvxyz";
			for (var i = 0; i < len; i++) {
				text += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			return text;
		}
		
		function backToSelectAttack() {
			self.typedSequence = '';
			self.waitingAttack = true;
			self.sequence = '';
			self.currentAttack = {};		
		}

		


	}
})();
