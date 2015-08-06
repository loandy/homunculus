'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcCharacterSelectionModalController
 * @description
 * # hcCharacterSelectionModalController
 * Controller for character selection modal.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterSelectionModalController', [
    '$modalInstance',
    'hcFlashMessagesService',
    'hcUtilityService',
    'characters',
    function ($modalInstance, FlashMessagesService, UtilityService, characters) {

      // Maintain reference to controller "scope."
      var self = this;

      self.characters = characters;

      // Initialize character selection form.
      self.characterSelectionForm = {};
      self.characterSelectionForm.characters = {};
      var characterUuids = Object.keys(self.characters);
      for (var i = 0, l = characterUuids.length; i < l; i++) {

        self.characterSelectionForm.characters[characterUuids[i]] = {
          'selected': false
        };

      }

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.addSelection = function () {

        var characterSelections = self.characterSelectionForm.characters;

        if (UtilityService.isNonEmptyObject(characterSelections)) {

          var characterSelectionsKeys = Object.keys(characterSelections);
          var selectedCharacters = [];

          for (var i = 0; i < characterSelectionsKeys.length; i++) {

            var characterSelectionUuid = characterSelectionsKeys[i];
            var characterSelection = characterSelections[characterSelectionUuid];

            if (characterSelection &&
              characterSelection.hasOwnProperty('selected') &&
              characterSelection.selected === true) {

              var characterObject = angular.copy(self.characters[characterSelectionUuid]);
              // Controls extended menu display for encounter view.
              characterObject.menuExtended = false;
              selectedCharacters.push(characterObject);

            }

          }

          $modalInstance.close(selectedCharacters);

        } else {

          FlashMessagesService.addFlashMessage({
            'type': 'danger',
            'message': 'Could not select characters.'
          });

        }

        // Close modal.
        $modalInstance.dismiss('submit');

      };

    }
  ]);