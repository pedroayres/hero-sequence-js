(function () {
  'use strict';
  angular.module('heroSequenceApp').factory('SelectedHeroService', SelectedHeroService);
  SelectedHeroService.inject = ['HEROES'];

  function SelectedHeroService(HEROES) {
    var self = this;
    var currentHero = {
      id: new Date().getTime(),
			name: HEROES[0],
			action: 'waiting',
			mirror: false,
			enemy: false,
			life: 100,
			stop: false,
      attacks: generateAttacks()
		};

    return {
      setHero: setHero,
      getHero: getHero
    };

    function setHero(hero) {
      var fields = Object.keys(hero);
      fields.forEach(function(field){
        currentHero[field] = hero[field];
      });
    }

    function getHero() {
      return angular.copy(currentHero);
    }

    function generateAttacks() {
      var enemyListAttack = [{
        name: 'attack_0',
        power: 10,
        letter: 'Q',
        keyCode: 81
      }, {
        name: 'attack_1',
        power: 20,
        letter: 'W',
        keyCode: 87
      }, {
        name: 'attack_2',
        power: 30,
        letter: 'E',
        keyCode: 69
      }, {
        name: 'attack_3',
        power: 40,
        letter: 'R',
        keyCode: 82
      }];

      return enemyListAttack;
    }

  }


} ());