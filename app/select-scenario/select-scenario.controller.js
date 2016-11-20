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
        path: 'images/scenario-1.jpg',
        selected: true
      }, {
        path: 'images/scenario-2.jpg',
        selected: false
      },
      {
        path: 'images/scenario-3.jpg',
        selected: false
      }
    ];

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
