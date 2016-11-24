(function () {
  'use strict';
  angular.module('heroSequenceApp').controller('SelectScenarioCtrl', SelectScenarioCtrl);
  SelectScenarioCtrl.inject = ['SelectedScenarioService', '$location'];
  function SelectScenarioCtrl(SelectedScenarioService, $location) {
    var self = this;
    self.selectScenario = selectScenario;
    self.toPlay = toPlay;
    self.scenarios = [
      {
        path: 'images/scenario_1.gif',
        selected: true
      }, {
        path: 'images/scenario_2.gif',
        selected: false
      },
      {
        path: 'images/scenario_3.gif',
        selected: false
      }
    ];
    self.selectedScene = self.scenarios[0];

    function selectScenario(scenario) {
      deselectAllScenarios();
      scenario.selected = true;
      self.selectedScene = scenario;
    }

    function deselectAllScenarios() {
      self.scenarios.forEach(function (scenario) {
        scenario.selected = false;
      });
    }
    
    function toPlay() {
      SelectedScenarioService.setScenario(self.selectedScene);
      $location.path("/fight");
    }
    
  }
})();
