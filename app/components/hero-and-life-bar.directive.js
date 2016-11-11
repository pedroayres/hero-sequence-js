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

      angular.element(document).on('keydown', dispatchMoviment);
      function getLife() {
        var life = {
          width: '75%'
        };
        return life;
      }

      function getHero() {
        return 'images/heroes/' + scope.hero.name + '_' + scope.hero.action + '.gif';
      }

      function dispatchMoviment(event) {
        if (scope.hero.enemy) {
          if (event.keyCode === 87) { // W
            attack('soco');
          } else if (event.keyCode === 65) { // A
            attack('dash');
          } else if (event.keyCode === 83) { // S
            attack('soco_continuo');
          } else if (event.keyCode === 68) { // D
            attack('chute')
          }
        }
      }

      function setAction(action) {
        scope.hero.action = action;
        scope.hero.image = getHero();
      }

      function attack(action) {
        angular.element('#' + scope.hero.id).addClass(scope.hero.enemy ? 'attack-enemy' : 'attack');
        scope.$apply();
        $timeout(function () {
          setAction(action);
        }, 500);
        $timeout(function () {
          setAction('waiting');
          console.log('waiting')
        }, 2000);
        $timeout(function () {
          angular.element('#' + scope.hero.id).removeClass(scope.hero.enemy ? 'attack-enemy' : 'attack');
          console.log('end')
        }, 3000);
      }

    }

  }
})();