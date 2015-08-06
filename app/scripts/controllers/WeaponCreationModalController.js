'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.directives:hcWeaponCreationController
 * @description
 * # hcWeaponCreationController
 * Controller for weapon creation modal.
 */
angular.module('homunculusApp.controllers')
  .controller('hcWeaponCreationModalController', [
    '$modalInstance',
    'hcWeaponService',
    'hcFlashMessagesService',
    function ($modalInstance, WeaponService, FlashMessagesService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isSubmitted = false;
      self.weapon = WeaponService.createWeaponObject();

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.createWeapon = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          WeaponService.createWeapon(self.weapon).then(function (results) {
            console.log(results);
          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating weapon: ' + error.message
            });

          });

        }
      };

    }
  ]);