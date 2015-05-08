'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusProfileController
 * @description
 * # HomunculusProfileController
 * Controller for managing profiles.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusProfileController', [
    'HomunculusProfileService',
    'HomunculusAlertService',
    'HomunculusUtilityService',
    'uuid',
    'initialData',
    function (ProfileService, AlertService, UtilityService, uuid, initialData) {

      var self = this;

      this.showCreateProfileForm = false;
      this.submittedCreateProfileForm = false;
      this.profiles = initialData.profiles; // Resolved by router.

      this.create = function (isValid, form) {

        self.submittedCreateProfileForm = true;

        if (isValid) {
          self.submittedCreateProfileForm = false;

          var profileNode = {
            'uuid': uuid.v1(),
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