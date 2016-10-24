(function () {
  'use strict';
  angular.module('heroSequenceApp').controller('SelectScenarioCtrl', SelectScenarioCtrl);
  SelectScenarioCtrl.inject = [];
  function SelectScenarioCtrl() {
    var self = this;
    self.selectScenario = selectScenario;

    self.scenarios = [
      {
        path: 'images/scenario-1.jpg',
        selected: true
      }, {
        path: 'images/scenario-2.jpeg',
        selected: false
      },
      {
        path: 'images/scenario-3.png',
        selected: false
      }
    ];

    function selectScenario(scenario) {
      deselectAllScenarios();
      scenario.selected = true;
    }

    function deselectAllScenarios() {
      self.scenarios.forEach(function(scenario){
        scenario.selected = false;
      });
    }
  }
})();
