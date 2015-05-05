'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:AlertService
 * @description
 * # AlertService
 * Service for managing Bootstrap alerts.
 */
angular.module('homunculusApp.services')
  .factory('AlertService', [
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