'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcFlashMessages
 * @description
 * # hcFlashMessages
 * Directive for displaying flash messages.
 */
angular.module('homunculusApp.directives')
  .directive('hcFlashMessages', [
    function () {

      return {
        'restrict': 'E',
        'controller': 'hcFlashMessagesController',
        'controllerAs': 'FlashMessages',
        'templateUrl': 'views/templates/flashMessages.html'
      };

    }
  ]);