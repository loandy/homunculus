'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusCharacterController
 * @description
 * # HomunculusCharacterController
 * Controller for managing characters.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusCharacterController', [
    'HomunculusCharacterService',
    'HomunculusProfileService',
    'HomunculusAlertService',
    'HomunculusUtilityService',
    'uuid',
    'initialData',
    function (CharacterService, ProfileService, AlertService, UtilityService, uuid, initialData) {

      var Character = {
        'name': '',
        'race': '',
        'classes': '',
        'level': '',
        'alignment': '',
        'xp': '',
        'height': {},
        'weight': '',
        'sex': '',
        'ability': {
          'strength': '',
          'dexterity': '',
          'constitution': '',
          'wisdom': '',
          'intelligence': ''
        },
        'maxHitPoints': '',
        'hitDice': '',
        'ideals': '',
        'bonds': '',
        'flaws': '',
        'background': '',
        'attacks': [],
        'features': [],
        'feats': [],
        'conditions': {}
      };

      var Attack = {
        'name': '',
        'damage': '',
        'damageType': ''
      };

      var Feature = {
        'name': '',
        'description': ''
      };

      var Feat = {
        'name': '',
        'description': ''
      };

      var Condition = {
        'name': '',
        'description': ''
      };

      var self = this;

      this.character = Object.create(Character);
      this.showCreateCharacterForm = false;
      this.submittedCreateCharacterForm = false;
      this.characters = initialData.characters; // Resolved by router.

      this.create = function (isValid, characterForm) {

        self.submittedCreateCharacterForm = true;

        if (isValid) {
          self.submittedCreateCharacterForm = false;

          var characterNode = {
            'uuid': uuid.v1(),
            'profileUuid': ProfileService.currentProfile.uuid,
          };

          Object.getOwnPropertyNames(Object.getPrototypeOf(characterForm)).forEach(function (property) {

            // Using instanceof instead of typeof to avoid null issues.
            if (characterForm[property] instanceof Object) {
              characterNode[property] = JSON.stringify(characterForm[property]);
            } else {
              characterNode[property] = characterForm[property];
            }

          });

          CharacterService.createCharacter(characterNode).then(function (results) {

            UtilityService.insertAlpha(characterNode, self.characters);

            AlertService.addAlert({
              'type': 'success',
              'message': 'Successfully created character.'
            });

            self.showCreateCharacterForm = false;

          }, function (error) {

            AlertService.addAlert({
              'type': 'danger',
              'message': 'Error creating character: ' + error.message
            });

          });
        }

      };

      this.getAll = function () {

        CharacterService.getAllProfileCharacters(ProfileService.currentProfile.uuid).then(function (results) {

          //results.sort(CharacterService.helper.alphaSort);

          self.characters = results;

        }, function (error) {

          AlertService.addAlert({
            'type': 'danger',
            'message': 'Error retrieving characters.'
          });

        });

      };

      this.addAttack = function () {
        self.character.attacks.push(Object.create(Attack));
      };

      this.removeAttack = function () {
        self.character.attacks.pop();
      };

      this.disableRemoveAttacks = function () {

        var disable = true;

        if (self.character.attacks.length > 0) {
          disable = false;
        }

        return disable;

      };

      this.addFeature = function () {
        self.character.features.push(Object.create(Feature));
      };

      this.removeFeature = function () {
        self.character.features.pop();
      };

      this.disableRemoveFeature = function () {

        var disable = true;

        if (self.character.features.length > 0) {
          disable = false;
        }

        return disable;

      };

      this.addFeat = function () {
        self.character.feats.push(Object.create(Feature));
      };

      this.removeFeat = function () {
        self.character.feats.pop();
      };

      this.disableRemoveFeat = function () {

        var disable = true;

        if (self.character.feats.length > 0) {
          disable = false;
        }

        return disable;

      };

    }
  ]);