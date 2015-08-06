'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcEditable
 * @description
 * # hcEditable
 * Directive for editing text in place.
 */
angular.module('homunculusApp.directives')
  .directive('hcEditable', [
    'hcCharacterService',
    function (CharacterService) {

      return {
        'restrict': 'A',
        'transclude': true,
        'replace': false,
        'scope': {
          'data': '=hcEditable'
        },
        'bindToController': true,
        'controller': 'hcEditableController',
        'controllerAs': 'Editable',
        'templateUrl': 'views/templates/editable.html'
      };

    }
  ]);