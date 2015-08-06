'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcEncounterCreationFormController
 * @description
 * # hcEncounterCreationFormController
 * Controller for managing encounter creation forms.
 */
angular.module('homunculusApp.controllers')
  .controller('hcEncounterCreationFormController', [
    '$q',
    '$modal',
    'hcCharacterService',
    'hcMonsterService',
    'hcEncounterService',
    'hcProfileService',
    'hcFlashMessagesService',
    'hcUtilityService',
    'uuid',
    function ($q, $modal, CharacterService, MonsterService, EncounterService, ProfileService, FlashMessagesService, UtilityService, uuid) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isVisible = false;
      self.isSubmitted = false;
      self.encounter = {};

      // Options for jQuery UI sortable directive.
      self.participantOptions = {
        'handle': '.handle'
      };

      self.openSelectCharacterModal = function () {

        var modalInstance = $modal.open({
          'templateUrl': 'views/modals/characterSelectionModal.html',
          'controller': 'hcCharacterSelectionModalController',
          'controllerAs': 'CharacterSelectionModal',
          'resolve': {
            'characters': function () {

              return CharacterService.getAllCharacters().then(function (results) {
                return UtilityService.generateLookup(results, 'uuid');
              });

            }
          },
          'backdrop': 'static'
        });

        modalInstance.result.then(function (selectedCharacters) {
          self.addParticipants('Character', selectedCharacters);
        });

      };

      self.openSelectMonsterModal = function () {

        var modalInstance = $modal.open({
          'templateUrl': 'views/modals/monsterSelectionModal.html',
          'controller': 'hcMonsterSelectionModalController',
          'controllerAs': 'MonsterSelectionModal',
          'resolve': {
            'monsters': function () {

              return MonsterService.getAllMonsters().then(function (results) {
                return UtilityService.generateLookup(results, 'uuid');
              });

            }
          },
          'backdrop': 'static'
        });

        modalInstance.result.then(function (selectedMonsters) {
          self.addParticipants('Monster', selectedMonsters);
        });

      };

      self.open = function () {
        self.isVisible = true;
      };

      self.cancel = function () {

        self.encounter = {};
        self.isVisible = false;

      };

      self.createEncounter = function (isValid) {

        self.isSubmitted = true;

        if (isValid) {

          self.isSubmitted = false;

          // Set current profile UUID for use as a "foreign key".
          self.encounter.profileUuid = ProfileService.currentProfile.uuid;

          EncounterService.createEncounter(self.encounter).then(function (results) {

            FlashMessagesService.addFlashMessage({
              'type': 'success',
              'message': 'Successfully created character.'
            });

          }, function (error) {

            FlashMessagesService.addFlashMessage({
              'type': 'danger',
              'message': 'Error creating character: ' + error.message
            });

          });

        }

        self.isVisible = false;

      };

      self.addParticipants = function (template, participants) {

        // Ensure participant array is available.
        if (!Array.isArray(self.encounter.participants) ||
          0 === self.encounter.participants.length) {
          self.encounter.participants = [];
        }

        participants.forEach(function (participant) {

          participant.template = template;
          self.encounter.participants.push(participant);

        });

      };

      self.hpBarColor = function (currentHitPoints, maxHitPoints) {

        var healthPercentage = currentHitPoints / maxHitPoints;
        var colorClass = '';

        if (healthPercentage > 0.66) {
          colorClass = 'progress-bar-success';
        } else if (healthPercentage > 0.33) {
          colorClass = 'progress-bar-warning';
        } else {
          colorClass = 'progress-bar-danger';
        }

        return colorClass;

      };

    }
  ]);