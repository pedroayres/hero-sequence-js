(function () {
  'use strict';

  angular
    .module('heroSequenceApp')
    .directive('heroAndLifeBar', heroAndLifeBar);

  heroAndLifeBar.inject = ['$timeout', 'Utils']

  function heroAndLifeBar($timeout, Utils) {
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
      
      scope.$on('endGame', endGame);
      scope.$on('enemyAttack', autoEnemyAttack);
      scope.$on('attackHero', attackHero);

      function getLife() {
        var life = {
          width: scope.hero.life + '%'
        };
        return life;
      }

      function getHero() {
        return 'images/heroes/' + scope.hero.name + '_' + scope.hero.action + '.gif';
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
          scope.$emit('attack', { isEnemy: scope.hero.enemy, power: power });
        }, 2000);
        $timeout(function () {
          angular.element('#' + scope.hero.id).removeClass(scope.hero.enemy ? 'attack-enemy' : 'attack');
        }, 3000);
      }

      function attackHero(event, action, power) {
        if(!scope.hero.enemy) {
          attack(action, power);
        }
      }

      function autoEnemyAttack() {
        if (scope.hero.enemy && !scope.hero.stop) {
          var enemyAttack = getRandomEnenmyAttack();
          attack(enemyAttack.name, enemyAttack.power);
        }
      }

      function getRandomEnenmyAttack() {
        var enemyListAttack = scope.hero.attacks;
        var numAttack = Utils.getRandomInt(0, enemyListAttack.length - 1);
        return enemyListAttack[numAttack];
      }

      function endGame() {
        console.log('endGame');
        if (scope.hero.life <= 0) {
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