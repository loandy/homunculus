'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:AlertController
 * @description
 * # AlertController
 * Controller for managing Bootstrap-styled alerts.
 */
angular.module('homunculusApp.controllers')
  .controller('AlertController', ['AlertService',
    function (AlertService) {

      var self = this;

      this.alerts = AlertService.alerts;

      this.closeAlert = function (index) {
        AlertService.alerts.splice(index, 1);
      };

  }]);
