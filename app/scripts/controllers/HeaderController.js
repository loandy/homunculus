'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcHeaderController
 * @description
 * # hcHeaderController
 * Controller for the primary header.
 */
angular.module('homunculusApp.controllers')
  .controller('hcHeaderController', [
    'hcProfileService',
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