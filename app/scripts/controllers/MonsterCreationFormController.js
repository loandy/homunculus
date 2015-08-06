'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcMonsterCreationFormController
 * @description
 * # hcMonsterCreationFormController
 * Controller for managing monster creation forms.
 */
angular.module('homunculusApp.controllers')
  .controller('hcMonsterCreationFormController', [
    'hcMonsterService',
    'hcSkillService',
    'hcFlashMessagesService',
    'hcUtilityService',
    'uuid',
    function (MonsterService, SkillService, FlashMessagesService, UtilityService, uuid) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isVisible = false;
      self.isSubmitted = false;
      self.isActionRemovalDisabled = true;
      self.isTraitRemovalDisabled = true;

      self.open = function () {

        // Create monster object if it doesn't already exist.
        if (!self.monster) {
          self.monster = MonsterService.createMonsterObject();
        }

        // Gather skill list if not already cached and open monster creation form.
        if (!self.skillList ||
          !Array.isArray(self.skillList) ||
          self.skillList.length === 0) {

          SkillService.getSkillList().then(function (results) {

            self.skillList = results;

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'There was an error with the monster creation form.'
            });

          });

        }

        self.isVisible = true;

      };

      self.cancel = function () {

        self.monster = {};
        self.isVisible = false;

      };

      self.create = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          MonsterService.createMonster(self.monster).then(function (results) {

            FlashMessagesService.addFlashMessage({
              'type': 'success',
              'message': 'Successfully created monster.'
            });

            self.isVisible = false;

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating monster: ' + error.message
            });

          });

        }

      };

      self.addTrait = function () {
        self.monster.traits.push(MonsterService.createTraitObject());
      };

      self.removeTrait = function () {
        self.monster.traits.pop();
      };

      self.disableRemoveTrait = function () {

        self.isTraitRemovalDisabled = true;

        if (self.monster &&
          Array.isArray(self.monster.traits) &&
          self.monster.traits.length > 0) {
          self.isTraitRemovalDisabled = false;
        }

        return self.isTraitRemovalDisabled;

      };

      self.addAction = function () {
        self.monster.actions.push(MonsterService.createActionObject());
      };

      self.removeAction = function () {
        self.monster.actions.pop();
      };

      self.disableRemoveAction = function () {

        self.isActionRemovalDisabled = true;

        if (self.monster &&
          Array.isArray(self.monster.actions) &&
          self.monster.actions.length > 0) {
          self.isActionRemovalDisabled = false;
        }

        return self.isActionRemovalDisabled;

      };

    }
  ]);