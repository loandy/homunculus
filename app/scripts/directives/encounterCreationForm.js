'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcEncounterCreationForm
 * @description
 * # hcEncounterCreationForm
 * Directive for encounter creation form.
 */
angular.module('homunculusApp.directives')
  .directive('hcEncounterCreationForm', [
    function () {

      return {
        'restrict': 'E',
        'controller': 'hcEncounterCreationFormController',
        'controllerAs': 'EncounterCreationForm',
        'templateUrl': 'views/templates/encounterCreationForm.html'
      };

    }
  ]);