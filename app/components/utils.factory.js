(function () {
  'use strict';
  angular.module('heroSequenceApp').service('Utils', Utils);
  Utils.inject = [];

  function Utils() {
    return {
        getRandomInt: getRandomInt
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  }


} ());