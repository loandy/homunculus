'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcDiceService
 * @description
 * # hcDiceService
 * Service for managing dice.
 */
angular.module('homunculusApp.services')
  .factory('hcDiceService', [
    '$q',
    function ($q) {

      return {
        'diceTypes': {
          'd4': 4,
          'd6': 6,
          'd8': 8,
          'd10': 10,
          'd12': 12,
          'd20': 20
        },
        'rollDice': function (sides, number) {

          var results = {
            'rolls': [],
            'total': 0
          };

          for (var i = 0, roll = 0; i < number; i++) {
            roll = 1 + Math.floor(Math.random() * sides);
            results.rolls.push(roll);
            results.total += roll;
          }

          return results;

        }
      };

    }
  ]);