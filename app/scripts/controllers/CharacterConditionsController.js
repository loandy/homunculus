'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcCharacterConditionsController
 * @description
 * # hcCharacterConditionsController
 * Controller for the character conditions directive.
 */
angular.module('homunculusApp.controllers')
  .controller('hcCharacterConditionsController', [
    '$modal',
    'hcConditionService',
    function ($modal, ConditionService) {

      // Maintain reference to controller "scope."
      var self = this;
      self.isResolved = false;

      ConditionService.getAllConditions().then(function (results) {
        self.conditionList = results;
        self.conditionList.forEach(function (condition, index) {
          condition.isVisible = false;
        });
        self.isResolved = true;
      });

      self.openCreateConditionModal = function () {

        var modalInstance = $modal.open({
          'templateUrl': 'views/modals/conditionCreationModal.html',
          'controller': 'hcConditionCreationModalController',
          'controllerAs': 'ConditionCreationModal',
          'resolve': {
            'conditionList': function () {
              return self.conditionList;
            }
          },
          'backdrop': 'static'
        });

      };

      self.addCondition = function () {

        var condition = [];

        if (self.conditionList[0]) {
          condition = self.conditionList[0];
        } else {
          condition = ConditionService.createConditionObject();
        }

        // Initialize condition array if it does not exist.
        if (!Array.isArray(self.character.conditions)) {
          self.character.conditions = [];
        }

        self.character.conditions.push(condition);

      };

      self.removeCondition = function (index) {

        if (index) {
          self.character.conditions.splice(index, 1);
        } else {
          self.character.conditions.pop();
        }

      };

      self.isRemoveConditionsDisabled = function () {

        var isDisabled = true;

        if (self.character &&
          Array.isArray(self.character.conditions) &&
          self.character.conditions.length > 0) {
          isDisabled = false;
        }

        return isDisabled;

      };

    }
  ]);
