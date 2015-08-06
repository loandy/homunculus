'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusSelectCharacterModalController
 * @description
 * # HomunculusSelectCharacterModalController
 * Controller for character selection modal.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusSelectCharacterModalController', [
    '$modalInstance',
    'HomunculusFlashService',
    'HomunculusUtilityService',
    'characters',
    function ($modalInstance, FlashService, UtilityService, characters) {

      var self = this;

      self.characters = characters;
      self.selectCharacterForm = {};

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.addCharacters = function (selectCharacterForm) {

        var characterSelections = selectCharacterForm.characters;

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

          FlashService.addAlert({
            'type': 'danger',
            'message': 'Could not add selected characters.'
          });

        }

        // Close modal.
        $modalInstance.dismiss();

      };

    }
  ]);