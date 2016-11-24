(function () {
    'use strict';
    angular.module('heroSequenceApp').controller('SelectHeroCtrl', SelectHeroCtrl);
    SelectHeroCtrl.inject = ['ServerRequest', '$location', 'AuthenticationFactory','SelectedHeroService'];

    function SelectHeroCtrl(ServerRequest, $location, AuthenticationFactory, SelectedHeroService) {
        var self = this;
        self.sendHero = sendHero;

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

        function sendHero(hero) {
            SelectedHeroService.setHero(hero);
            $location.path( "/select-scenario" );
        }
    }


} ());