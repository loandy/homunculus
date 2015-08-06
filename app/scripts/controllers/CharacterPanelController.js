'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.directives:hcCharacterPanelController
 * @description
 * # hcCharacterPanelController
 * Controller for character directive.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterPanelController', [
    'hcSkillService',
    function (SkillService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.selectedMenu = '';
      self.selectedAttackMenu = '';
      self.selectedCharacterInfoMenu = '';
      self.isResolved = false;

      SkillService.getSkillList().then(function (results) {
        self.skillList = results;
        self.isResolved = true;
      });

    }
  ]);