'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcCharacterCreationForm
 * @description
 * # hcCharacterCreationForm
 * Directive for character creation form.
 */
angular.module('homunculusApp.directives')
  .directive('hcCharacterCreationForm', [
    function () {

      return {
        'restrict': 'E',
        'controller': 'hcCharacterCreationFormController',
        'controllerAs': 'CharacterCreationForm',
        'templateUrl': 'views/templates/characterCreationForm.html'
      };

    }
  ]);