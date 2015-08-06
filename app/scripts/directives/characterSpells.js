'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcCharacterSpells
 * @description
 * # hcCharacterSpells
 * Directive for character spells.
 */
angular.module('homunculusApp.directives')
  .directive('hcCharacterSpells', [
    function () {

      return {
        'restrict': 'E',
        'scope': {
          'character': '=character'
        },
        'bindToController': true,
        'controller': 'hcCharacterSpellsController',
        'controllerAs': 'CharacterSpells',
        'templateUrl': 'views/templates/characterSpells.html'
      };

    }
  ]);