'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcCharacterPanel
 * @description
 * # hcCharacterPanel
 * Directive for displaying character information for encounters.
 */
angular.module('homunculusApp.directives')
  .directive('hcCharacterPanel', [
    function () {

      return {
        'restrict': 'A',
        'scope': {
          'character': '=hcCharacterPanel',
          'remove': '&onRemove'
        },
        'bindToController': true,
        'controller': 'hcCharacterPanelController',
        'controllerAs': 'CharacterPanel',
        'templateUrl': 'views/templates/characterPanel.html'
      };

    }
  ]);