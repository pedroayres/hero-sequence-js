(function () {
    'use strict';
    angular.module('heroSequenceApp').controller('ProfileCtrl', ProfileCtrl);
    ProfileCtrl.inject = ['ServerRequest', '$location', 'AuthenticationFactory'];

    function ProfileCtrl(ServerRequest, $location, AuthenticationFactory) {
        var self = this;

        self.heroSpecs = heroSpecs;
        self.userSpecs = userSpecs;

        userSpecs();
        heroSpecs();

        function userSpecs() {
            ServerRequest.get('user/' + AuthenticationFactory.user._id).then(function (res) {
                console.log(res);
                self.userInfo = res;
            });
        }

        function heroSpecs() {
            ServerRequest.get('heroes/').then(function (res) {
                self.heroInfo = res;
            });
        }
    }


} ());