'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcCharacterConditions
 * @description
 * # hcCharacterConditions
 * Directive for character attacks.
 */
angular.module('homunculusApp.directives')
  .directive('hcCharacterConditions', [
    function () {

      return {
        'restrict': 'E',
        'scope': {
          'character': '=character'
        },
        'bindToController': true,
        'controller': 'hcCharacterConditionsController',
        'controllerAs': 'CharacterConditions',
        'templateUrl': 'views/templates/characterConditions.html'
      };

    }
  ]);