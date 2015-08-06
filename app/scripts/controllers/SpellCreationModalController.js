'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.directives:hcSpellCreationController
 * @description
 * # hcSpellCreationController
 * Controller for spell creation modal.
 */
angular.module('homunculusApp.controllers')
  .controller('hcSpellCreationModalController', [
    '$modalInstance',
    'hcSpellService',
    'hcFlashMessagesService',
    function ($modalInstance, SpellService, FlashMessagesService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isSubmitted = false;
      self.spell = SpellService.createSpellObject();

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.createSpell = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          SpellService.createSpell(self.spell).then(function (results) {

            console.log(results);
            $modalInstance.close(results);

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating spell: ' + error.message
            });

          });

        }

      };

    }
  ]);