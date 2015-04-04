'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:ProfileController
 * @description
 * # ProfileController
 * Controller for managing profiles.
 */
angular.module('homunculusApp.controllers')
  .controller('ProfileController', ['AlertService', 'ProfileService', 'initialData',
    function (AlertService, ProfileService, initialData) {

      var self = this;

      this.showCreateProfileForm = false;
      this.submittedCreateProfileForm = false;
      this.profiles = initialData.profiles; // Resolved by router.

      this.create = function (isValid, form) {

        self.submittedCreateProfileForm = true;

        if (isValid) {
          self.submittedCreateProfileForm = false;

          var profileNode = {
            'name': form.name
          };

          ProfileService.createProfile(profileNode).then(function (results) {

            AlertService.addAlert({
              'type': 'success',
              'message': 'Successfully created profile.'
            });

            self.showCreateProfileForm = false;

          }, function (error) {

            AlertService.addAlert({
              'type': 'danger',
              'message': 'Error creating profile: ' + error.message
            });

          });
        }

      };

      this.getAll = function () {

        ProfileService.getAllProfiles().then(function (results) {

          self.profiles = results;

        }, function (error) {

          AlertService.addAlert({
            'type': 'danger',
            'message': 'Error retrieving profiles.'
          });

        });

      };

    }
  ]);