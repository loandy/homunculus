'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusAlertService
 * @description
 * # HomunculusAlertService
 * Service for managing Bootstrap alerts.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusAlertService', [
    function () {

      return {
        'alerts': [],
        'addAlert': function (alert) {

          this.alerts.push({
            'type': alert.type,
            'message': alert.message
          });

        },
        'clearAlerts': function () {
          this.alerts = [];
        }
      };

    }
  ]);