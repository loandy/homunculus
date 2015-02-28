'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the homunculusApp
 */
angular.module('homunculusApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
