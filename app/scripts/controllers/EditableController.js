'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcEditableController
 * @description
 * # hcEditableController
 * Controller for the edit-in-place directive.
 */
angular.module('homunculusApp.controllers')
  .controller('hcEditableController', [
    '$scope',
    '$window',
    function ($scope, $window) {

      var self = this;

      self.isEditingEnabled = false;
      self.preventClose = false;

      self.enableEditing = function () {

        self.isEditingEnabled = true;

        // Prevents window.onclick from immediately closing input.
        self.preventClose = true;

      };

      self.disableEditing = function () {
        self.isEditingEnabled = false;
      };

      // Since the inputs are not wrapped in forms,
      // we must handle 'enter' keypresses manually.
      self.keyPress = function ($event) {

        // Determine whether keypress was the 'enter' key.
        if (13 === $event.charCode) {

          self.disableEditing();
          $event.stopPropagation();

        }

      };

      // Prevents input from closing if clicking on the input itself.
      self.clickIntercept = function (event) {
        event.stopPropagation();
      };

      // Closes input if clicking outside.
      angular.element($window).on('click', function (event) {

        if (true === self.isEditingEnabled && false === self.preventClose) {

          self.isEditingEnabled = false;
          $scope.$apply();

        } else {
          self.preventClose = false;
        }

      });

    }
  ]);
