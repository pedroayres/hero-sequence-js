(function () {
  'use strict';

  angular
    .module('heroSequenceApp')
    .directive('heroAndLifeBar', heroAndLifeBar);

  heroAndLifeBar.inject = ['$timeout']

  function heroAndLifeBar($timeout) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'components/hero-and-life-bar.html',
      scope: {
        buttons: '=',
        enemy: '=',
        hero: '='
      },
      link: link
    };

    return directive;

    function link(scope, element) {
      scope.getLife = getLife;
      scope.hero.image = getHero();
      scope.hero.id = new Date().getTime();
      autoEnemyAttack();
      angular.element(document).on('keydown', dispatchMoviment);
      scope.$on('endGame', endGame);

      var enemyListAttack = [{
        name: 'attack_1',
        power: 10
      }, {
        name: 'attack_2',
        power: 20
      }, {
        name: 'attack_3',
        power: 30
      },{
        name: 'attack_4',
        power: 40
      }];

      function getLife() {
        var life = {
          width: scope.hero.life + '%'
        };
        return life;
      }

      function getHero() {
        return 'images/heroes/' + scope.hero.name + '_' + scope.hero.action + '.gif';
      }

      function dispatchMoviment(event) {
        if (!scope.hero.enemy  && !scope.hero.stop) {
          if (event.keyCode === 87) { // W
            attack('attack_0', 10);
          } else if (event.keyCode === 65) { // A
            attack('attack_1', 20);
          } else if (event.keyCode === 83) { // S
            attack('attack_2', 30);
          } else if (event.keyCode === 68) { // D
            attack('attack_3', 40)
          }
        }
      }

      function setAction(action) {
        scope.hero.action = action;
        scope.hero.image = getHero();
      }

      function attack(action, power) {
        angular.element('#' + scope.hero.id).addClass(scope.hero.enemy ? 'attack-enemy' : 'attack');
        scope.$apply();
        $timeout(function () {
          setAction(action);
        }, 500);
        $timeout(function () {
          setAction('waiting');
          scope.$emit('attack', {isEnemy: scope.hero.enemy, power: power});
        }, 2000);
        $timeout(function () {
          angular.element('#' + scope.hero.id).removeClass(scope.hero.enemy ? 'attack-enemy' : 'attack');
        }, 3000);
      }

      function autoEnemyAttack() {
        if (scope.hero.enemy && !scope.hero.stop) {
          $timeout(function () {
            var enemyAttack = getRandomEnenmyAttack();
            attack(enemyAttack.name, enemyAttack.power);
            autoEnemyAttack();
          }, 7000);
        }
      }

      function getRandomEnenmyAttack() {
        var numAttack = getRandomInt(0, enemyListAttack.length - 1);
        return enemyListAttack[numAttack];
      }

      function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      function endGame() {
        console.log('endGame');
        if(scope.hero.life <= 0) {
          setAction('lose');
          scope.$apply();
        } else {
          setAction('win');
          scope.$apply();
        }
        
      }


    }

  }
})();