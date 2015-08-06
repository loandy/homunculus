'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcMonsterCreationForm
 * @description
 * # hcMonsterCreationForm
 * Directive for monster creation form.
 */
angular.module('homunculusApp.directives')
  .directive('hcMonsterCreationForm', [
    function () {

      return {
        'restrict': 'E',
        'controller': 'hcMonsterCreationFormController',
        'controllerAs': 'MonsterCreationForm',
        'templateUrl': 'views/templates/monsterCreationForm.html'
      };

    }
  ]);