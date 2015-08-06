'use strict';

/**
 * @ngdoc directive
 * @name homunculusApp.directives:hcHeader
 * @description
 * # hcHeader
 * Directive for displaying the application header.
 */
angular.module('homunculusApp.directives')
  .directive('hcHeader', [
    function () {

      return {
        'restrict': 'E',
        'controller': 'hcHeaderController',
        'controllerAs': 'Header',
        'templateUrl': 'views/templates/header.html'
      };

    }
  ]);