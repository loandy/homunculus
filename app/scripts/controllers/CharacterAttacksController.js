'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcCharacterAttacksController
 * @description
 * # hcCharacterAttacksController
 * Controller for the character attacks directive.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterAttacksController', [
    '$modal',
    'hcWeaponService',
    function ($modal, WeaponService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isResolved = false;

      WeaponService.getAllWeapons().then(function (results) {
        self.weaponList = results;
        self.isResolved = true;
      });

      self.openCreateWeaponModal = function () {

        var modalInstance = $modal.open({
          'templateUrl': 'views/modals/weaponCreationModal.html',
          'controller': 'hcWeaponCreationModalController',
          'controllerAs': 'WeaponCreationModal',
          'resolve': {
            'weaponList': function () {
              return self.weaponList;
            }
          },
          'backdrop': 'static'
        });

      };

      self.addAttack = function () {

        var attack = {};

        if (self.weaponList[0]) {
          attack = self.weaponList[0];
        } else {
          attack = WeaponService.createWeaponObject();
        }

        // Initialize attack array if it does not exist.
        if (!Array.isArray(self.character.attacks)) {
          self.character.attacks = [];
        }

        self.character.attacks.push(attack);

      };

      self.removeAttack = function (index) {

        if (index) {
          self.character.attacks.splice(index, 1);
        } else {
          self.character.attacks.pop();
        }

      };

      self.isRemoveAttacksDisabled = function () {

        var isDisabled = true;

        if (self.character &&
          Array.isArray(self.character.attacks) &&
          self.character.attacks.length > 0) {
          isDisabled = false;
        }

        return isDisabled;

      };

    }
  ]);
