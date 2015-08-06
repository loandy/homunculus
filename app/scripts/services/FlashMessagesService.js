'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcFlashMessagesService
 * @description
 * # hcFlashMessagesService
 * Service for managing Bootstrap-styled flash messages.
 */
angular.module('homunculusApp.services')
  .factory('hcFlashMessagesService', [
    function () {

      return {
        'flashMessages': [],
        'addFlashMessage': function (flashMessage) {

          this.flashMessages.push({
            'type': flashMessage.type,
            'message': flashMessage.message
          });

        },
        'clearFlashMessages': function () {
          this.flashMessages = [];
        }
      };

    }
  ]);