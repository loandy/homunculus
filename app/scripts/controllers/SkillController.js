'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusSkillController
 * @description
 * # HomunculusSkillController
 * Controller for managing skills.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusSkillController', [
    'HomunculusSkillService',
    'HomunculusAlertService',
    'HomunculusUtilityService',
    'uuid',
    'initialData',
    function (SkillService, AlertService, UtilityService, uuid, initialData) {

      var self = this;

      var generateSkillLookup = function (skills) {

        var lookup = {};

        for (var i = 0, l = skills.length; i < l; i++) {
          lookup[skills[i].uuid] = skills[i];
        }

        return lookup;

      };

      self.showCreateSkillForm = false;
      self.submittedCreateSkillForm = false;
      self.skills = initialData.skills; // Resolved by router.

      this.create = function (isValid, form) {

        self.submittedCreateSkillForm = true;

        if (isValid) {
          self.submittedCreateSkillForm = false;

          var skillNode = {
            'uuid': uuid.v1(),
            'name': form.name
          };

          SkillService.createSkill(skillNode).then(function (results) {

            UtilityService.insertAlpha(skillNode, self.skills);

            AlertService.addAlert({
              'type': 'success',
              'message': 'Successfully created skill.'
            });

            self.showCreateSkillForm = false;

          }, function (error) {

            AlertService.addAlert({
              'type': 'danger',
              'message': 'Error creating skill: ' + error.message
            });

          });
        }

      };

      this.getAll = function () {

        SkillService.getAllSkills().then(function (results) {

          results.sort(SkillService.helper.alphaSort);

          self.skills = results;

          self.skillLookup = generateSkillLookup(self.skills);

        }, function (error) {

          AlertService.addAlert({
            'type': 'danger',
            'message': 'Error retrieving skills.'
          });

        });

      };

      this.select = function (form) {

        var skill = self.skillLookup[form.uuid];

        self.currentSkill = skill;

      };

    }
  ]);