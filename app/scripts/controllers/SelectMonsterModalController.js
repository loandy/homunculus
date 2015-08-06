'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusSelectMonsterModalController
 * @description
 * # HomunculusSelectMonsterModalController
 * Controller for monster selection modal.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusSelectMonsterModalController', [
    '$modalInstance',
    'HomunculusFlashService',
    'HomunculusUtilityService',
    'monsters',
    function ($modalInstance, FlashService, UtilityService, monsters) {

      var self = this;

      self.monsters = monsters;
      self.selectMonsterForm = {};

      // Initialize monster selection form.
      self.selectMonsterForm.monsters = [];
      var monsterUuids = Object.keys(monsters);
      for (var i = 0, l = monsterUuids.length; i < l; i++) {

        self.selectMonsterForm.monsters[monsterUuids[i]] = {
          'selected': false,
          'quantity': 1
        };

      }

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      self.addMonsters = function (selectMonsterForm) {

        var monsterSelections = selectMonsterForm.monsters;

        if (UtilityService.isNonEmptyObject(monsterSelections)) {

          var monsterSelectionsKeys = Object.keys(monsterSelections);
          var selectedMonsters = [];

          for (var i = 0, l = monsterSelectionsKeys.length; i < l; i++) {

            var monsterSelectionUuid = monsterSelectionsKeys[i];
            var monsterSelection = monsterSelections[monsterSelectionUuid];

            if (monsterSelection &&
              monsterSelection.hasOwnProperty('selected') &&
              monsterSelection.hasOwnProperty('quantity') &&
              monsterSelection.selected === true &&
              monsterSelection.quantity > 0) {

              for (var j = 0; j < monsterSelection.quantity; j++) {

                var monster = angular.copy(self.monsters[monsterSelectionUuid]);

                // Suffix a number if there are duplicate copies of the same monster.
                if (monsterSelection.quantity > 0) {
                  monster.name = monster.name + ' ' + (j + 1);
                }

                selectedMonsters.push(monster);

              }

            }

          }

          $modalInstance.close(selectedMonsters);

        } else {

          FlashService.addAlert({
            'type': 'danger',
            'message': 'Could not add selected monsters.'
          });

        }

        // Close modal.
        $modalInstance.dismiss();

      };

    }
  ]);