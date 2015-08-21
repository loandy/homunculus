'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcMonsterPanel
 * @description
 * # hcMonsterPanel
 * Directive for displaying monster information for encounters.
 */
angular.module('homunculusApp.directives')
  .directive('hcMonsterPanel', [
    function () {

      return {
        'restrict': 'A',
        'scope': {
          'monster': '=hcMonsterPanel',
          'remove': '&onRemove'
        },
        'bindToController': true,
        'controller': 'hcMonsterPanelController',
        'controllerAs': 'MonsterPanel',
        'templateUrl': 'views/templates/monsterPanel.html'
      };

    }
  ]);