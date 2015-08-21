'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcCharacterCreationFormController
 * @description
 * # hcCharacterCreationFormController
 * Controller for managing character creation forms.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterCreationFormController', [
    'hcCharacterService',
    'hcProfileService',
    'hcSkillService',
    'hcFlashMessagesService',
    function (CharacterService, ProfileService, SkillService, FlashMessagesService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isVisible = false;
      self.isSubmitted = false;
      self.selectedAttackMenu = '';
      self.skillList = [];

      self.open = function () {

        // Create character object if it doesn't already exist.
        if (!self.character) {
          self.character = CharacterService.createCharacterObject();
        }

        // Gather skill list if not already cached and open character creation form.
        if (!Array.isArray(self.skillList) ||
          self.skillList.length === 0) {

          SkillService.getSkillList().then(function (results) {

            self.skillList = results;

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'There was an error with the character creation form.'
            });

          });

        }

        self.isVisible = true;

      };

      self.cancel = function () {

        self.character = {};
        self.isVisible = false;

      };

      self.createCharacter = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          // Set current profile UUID for use as a "foreign key".
          //self.character.profileUuid = ProfileService.currentProfile.uuid;

          CharacterService.createCharacter(self.character).then(function (results) {

            FlashMessagesService.addFlashMessage({
              'type': 'success',
              'message': 'Successfully created character.'
            });

            self.isVisible = false;

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating character: ' + error.message
            });

          });

        }

      };

      self.addFeature = function () {
        self.character.features.push(CharacterService.createFeatureObject());
      };

      self.removeFeature = function () {
        self.character.features.pop();
      };

      self.isRemoveFeaturesDisabled = function () {

        var isDisabled = true;

        if (self.character &&
          Array.isArray(self.character.features) &&
          self.character.features.length > 0) {
          isDisabled = false;
        }

        return isDisabled;

      };

      self.addFeat = function () {
        self.character.feats.push(CharacterService.createFeatObject());
      };

      self.removeFeat = function () {
        self.character.feats.pop();
      };

      self.isRemoveFeatsDisabled = function () {

        var isDisabled = true;

        if (self.character &&
          Array.isArray(self.character.feats) &&
          self.character.feats.length > 0) {
          isDisabled = false;
        }

        return isDisabled;

      };

    }
  ]);