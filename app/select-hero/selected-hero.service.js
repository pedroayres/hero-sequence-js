(function () {
    'use strict';
    angular.module('heroSequenceApp').service('SelectedHeroService', SelectedHeroService);
    SelectedHeroService.inject = [];

    function SelectedHeroService() {
        var self = this;
        var currentHero = {};
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