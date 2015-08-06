'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcCharacterSpellsController
 * @description
 * # hcCharacterSpellsController
 * Controller for the character spells directive.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterSpellsController', [
    '$modal',
    'hcSpellService',
    function ($modal, SpellService) {

      // Maintain reference to controller "scope."
      var self = this;

      self.isResolved = false;

      SpellService.getAllSpells().then(function (results) {
        self.spellList = results;
        self.isResolved = true;
      });

      self.openCreateSpellModal = function () {

        var modalInstance = $modal.open({
          'templateUrl': 'views/modals/spellCreationModal.html',
          'controller': 'hcSpellCreationModalController',
          'controllerAs': 'SpellCreationModal',
          'backdrop': 'static'
        });

      };

      self.addSpell = function () {

        var spell = {};

        if (self.spellList[0]) {
          spell = self.spellList[0];
        } else {
          spell = SpellService.createSpellObject();
        }

        // Initialize spell array if it does not exist.
        if (!Array.isArray(self.character.spells)) {
          self.character.spells = [];
        }

        self.character.spells.push(spell);

      };

      self.removeSpell = function (index) {

        if (index) {
          self.character.spells.splice(index, 1);
        } else {
          self.character.spells.pop();
        }

      };

      self.isRemoveSpellsDisabled = function () {

        var isDisabled = true;

        if (self.character &&
          Array.isArray(self.character.spells) &&
          self.character.spells.length > 0) {
          isDisabled = false;
        }

        return isDisabled;

      };

    }
  ]);
