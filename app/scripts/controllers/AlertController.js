'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusAlertController
 * @description
 * # HomunculusAlertController
 * Controller for managing Bootstrap-styled alerts.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusAlertController', [
    'HomunculusAlertService',
    function (AlertService) {

      var self = this;

      this.alerts = AlertService.alerts;

      this.closeAlert = function (index) {
        AlertService.alerts.splice(index, 1);
      };

  }]);
