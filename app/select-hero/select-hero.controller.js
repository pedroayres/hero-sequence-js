(function () {
    'use strict';
    angular.module('heroSequenceApp').controller('SelectHeroCtrl', SelectHeroCtrl);
    SelectHeroCtrl.inject = ['ServerRequest', '$location', 'AuthenticationFactory','SelectedHeroService'];

    function SelectHeroCtrl(ServerRequest, $location, AuthenticationFactory, SelectedHeroService) {
        var self = this;

        self.heroSpecs = heroSpecs;
        self.userSpecs = userSpecs;
        self.changedHero = changedHero;
        self.sendHero = sendHero;

        self.showSelected = false;

        userSpecs();
        heroSpecs();

        function userSpecs() {
            ServerRequest.get('user/' + AuthenticationFactory.user._id).then(function (res) {

                self.userInfo = res;
            });
        }

        function heroSpecs() {
            ServerRequest.get('heroes/').then(function (res) {
                self.heroInfo = res;
            });
        }

        function changedHero(hero) {
            unselectHero(hero);
            hero.selected = true;
            self.showSelected = true;
            self.selectHero = hero.name;
            self.selectedHeroObj = hero;
        }

        function unselectHero() {
            self.heroInfo.forEach(function (element) {
                element.selected = false;
            }, this);
        }

        function sendHero() {
            SelectedHeroService.setHero(self.selectedHeroObj);
            $location.path( "/select-scenario" );
        }
    }


} ());