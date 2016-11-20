(function () {
  'use strict';
  angular.module('heroSequenceApp').service('SelectedHeroService', SelectedHeroService);
  SelectedHeroService.inject = ['HEROES'];

  function SelectedHeroService(HEROES) {
    var self = this;
    var currentHero = {
			name: HEROES[0],
			action: 'waiting',
			mirror: false,
			enemy: false,
			life: 100,
			stop: false
		};

    self.setHero = setHero;
    self.getHero = getHero;

    function setHero(hero) {
      currentHero = hero;
    }

    function getHero() {
      return currentHero;
    }

  }


} ());