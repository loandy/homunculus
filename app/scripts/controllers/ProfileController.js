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
    'HomunculusFlashService',
    'HomunculusUtilityService',
    'uuid',
    'initialData',
    function (ProfileService, FlashService, UtilityService, uuid, initialData) {

      var generateProfileLookup = function (profiles) {

        var lookup = {};

        for (var i = 0, l = profiles.length; i < l; i++) {
          lookup[profiles[i].uuid] = profiles[i];
        }

        return lookup;

      };

      var self = this;

      self.showCreateProfileForm = false;
      self.submittedCreateProfileForm = false;
      self.createProfileForm = {};
      self.profiles = initialData.profiles; // Resolved by router.
      self.profileLookup = generateProfileLookup(this.profiles);

      Object.defineProperty(self, 'currentProfile', {
        'enumerable': true,
        'configurable': true,
        'writeable': true,
        'get': function () {
          return ProfileService.currentProfile;
        },
        'set': function (newValue) {
          ProfileService.currentProfile = newValue;
        }
      });

      self.cancelCreateProfileForm = function () {

        self.createProfileForm = {};
        self.showCreateProfileForm = false;

      };

      this.createProfile = function (isValid, form) {

        self.submittedCreateProfileForm = true;

        if (isValid) {
          self.submittedCreateProfileForm = false;

          var profileNode = {
            'uuid': uuid.v1(),
            'name': form.name
          };

          ProfileService.createProfile(profileNode).then(function (results) {

            UtilityService.insertAlpha(profileNode, self.profiles);

            FlashService.addAlert({
              'type': 'success',
              'message': 'Successfully created profile.'
            });

            self.showCreateProfileForm = false;

          }, function (error) {

            FlashService.addAlert({
              'type': 'danger',
              'message': 'Error creating profile: ' + error.message
            });

          });
        }

      };

      this.getAll = function () {

        ProfileService.getAllProfiles().then(function (results) {

          results.sort(ProfileService.helper.alphaSort);

          self.profiles = results;

          self.profileLookup = generateProfileLookup(self.profiles);

        }, function (error) {

          FlashService.addAlert({
            'type': 'danger',
            'message': 'Error retrieving profiles.'
          });

        });

      };

      this.select = function (form) {

        var profile = self.profileLookup[form.uuid];

        self.currentProfile = profile;

      };

    }
  ]);