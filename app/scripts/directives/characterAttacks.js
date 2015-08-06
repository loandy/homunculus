'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcCharacterAttacks
 * @description
 * # hcCharacterAttacks
 * Directive for character attacks.
 */
angular.module('homunculusApp.directives')
  .directive('hcCharacterAttacks', [
    function () {

      return {
        'restrict': 'E',
        'scope': {
          'character': '=character'
        },
        'bindToController': true,
        'controller': 'hcCharacterAttacksController',
        'controllerAs': 'CharacterAttacks',
        'templateUrl': 'views/templates/characterAttacks.html'
      };

    }
  ]);