'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusMonsterController
 * @description
 * # HomunculusMonsterController
 * Controller for managing monsters.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusMonsterController', [
    'HomunculusMonsterService',
    'HomunculusSkillService',
    'HomunculusAlertService',
    'HomunculusUtilityService',
    'uuid',
    'initialData',
    function (MonsterService, SkillService, AlertService, UtilityService, uuid, initialData) {

      var Monster = {
        'name': '',
        'size': '',
        'armorClass':  '',
        'challenge': '',
        'abilities': {
          'strength': '',
          'dexterity': '',
          'constitution': '',
          'wisdom': '',
          'intelligence': ''
        },
        'savingThrows': {
          'strength': '',
          'dexterity': '',
          'constitution': '',
          'wisdom': '',
          'intelligence': ''
        },
        'maxHitPoints': '',
        'hitDice': '',
        'actions': [],
        'skills': [],
        'damageVulnerabilities': '',
        'damageResistances': '',
        'damageImmunities': '',
        'conditionImmunities': ''
      };

      var Action = {
        'name': '',
        'description': ''
      };

      // Ensures controller properties are accessible in method definitions.
      var self = this;

      self.createMonsterForm = Object.create(Monster);
      self.showCreateMonsterForm = false;
      self.submittedCreateMonsterForm = false;
      self.masterSkillList = initialData.masterSkillList;

      self.create = function (isValid, monsterForm) {

        console.log(monsterForm);

        self.submittedCreateMonsterForm = true;

        if (isValid) {
          self.submittedCreateMonsterForm = false;

          var monsterNode = {
            'uuid': uuid.v1()
          };

          Object.getOwnPropertyNames(Object.getPrototypeOf(monsterForm)).forEach(function (property) {

            // Stringify any objects.
            // Using instanceof instead of typeof to avoid null issues.
            if (monsterForm[property] instanceof Object) {
              monsterNode[property] = JSON.stringify(monsterForm[property]);
            } else {
              monsterNode[property] = monsterForm[property];
            }

          });

          MonsterService.createMonster(monsterNode).then(function (results) {

            AlertService.addAlert({
              'type': 'success',
              'message': 'Successfully created monster.'
            });

            self.showCreateMonsterForm = false;

          }, function (error) {

            AlertService.addAlert({
              'type': 'danger',
              'message': 'Error creating monster: ' + error.message
            });

          });
        }

      };

      self.addAction = function () {
        self.createMonsterForm.actions.push(Object.create(Action));
      };

      self.removeAction = function () {
        self.createMonsterForm.actions.pop();
      };

      self.disableRemoveAction = function () {

        var disable = true;

        if (self.createMonsterForm.actions.length > 0) {
          disable = false;
        }

        return disable;

      };

      self.addSkill = function () {
        self.createMonsterForm.skills.push(SkillService.generateSkillObject());
      };

      self.removeSkill = function () {
        self.createMonsterForm.skills.pop();
      };

      self.disableRemoveSkill = function () {

        var disable = true;

        if (self.createMonsterForm.skills.length > 0) {
          disable = false;
        }

        return disable;

      };

    }
  ]);