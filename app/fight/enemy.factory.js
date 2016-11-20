(function () {
  'use strict';
  angular.module('heroSequenceApp').service('EnemyFactory', EnemyFactory);
  EnemyFactory.inject = ['HEROES', 'Utils'];

  function EnemyFactory(HEROES, Utils) {
    var self = this;
    var enemy = {
      name: HEROES[Utils.getRandomInt(0, HEROES.length - 1)],
      action: 'waiting',
      mirror: true,
      enemy: true,
      life: 100,
      stop: false,
      attacks: createEnemyAttacks()
    };

    self.generate = generate;

    function generate() {
      return enemy;
    }

    function createEnemyAttacks() {
      var enemyListAttack = [{
        name: 'attack_0',
        power: 10
      }, {
        name: 'attack_1',
        power: 20
      }, {
        name: 'attack_2',
        power: 30
      }, {
        name: 'attack_3',
        power: 40
      }];

      return enemyListAttack;
    }

  }


} ());