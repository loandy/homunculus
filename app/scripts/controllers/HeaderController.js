'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:HomunculusHeaderController
 * @description
 * # HomunculusHeaderController
 * Controller for the primary header.
 */
angular.module('homunculusApp.controllers')
  .controller('HomunculusHeaderController', [
    'HomunculusProfileService',
    function (ProfileService) {

      var self = this;

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

    }
  ]);