'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusSelectAttackModalController
 * @description
 * # HomunculusSelectAttackModalController
 * Controller for attack type selection modal.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusSelectAttackModalController', [
    '$modalInstance',
    'HomunculusEncounterFormService',
    'HomunculusAlertService',
    'HomunculusUtilityService',
    function ($modalInstance, EncounterFormService, AlertService, UtilityService) {

      var self = this;

      self.createEncounterForm = EncounterFormService.createEncounterForm;

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.selectAttackType = function (attackType) {
        $modalInstance.close(attackType);
      };

    }
  ]);