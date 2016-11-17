(function () {
    'use strict';
    angular.module('heroSequenceApp').service('SelectedScenarioService', SelectedScenarioService);
    SelectedScenarioService.inject = [];

    function SelectedScenarioService() {
        var self = this;
        var currentScenario = {};
        self.setScenario = setScenario;
        self.getScenario = getScenario;

        function setScenario(scenario) {
            console.log(scenario);
            currentScenario = scenario;
        }

        function getScenario() {
            return currentScenario;
        }
    }


} ());