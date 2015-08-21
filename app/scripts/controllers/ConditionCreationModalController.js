'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.directives:hcConditionCreationController
 * @description
 * # hcConditionCreationController
 * Controller for condition creation modal.
 */
angular.module('homunculusApp.controllers')
  .controller('hcConditionCreationModalController', [
    '$modalInstance',
    'hcConditionService',
    'hcFlashMessagesService',
    function ($modalInstance, ConditionService, FlashMessagesService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isSubmitted = false;
      self.condition = ConditionService.createConditionObject();

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.createCondition = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          ConditionService.createCondition(self.condition).then(function (results) {

            $modalInstance.close(results);

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating condition: ' + error.message
            });

          });

        }
      };

    }
  ]);