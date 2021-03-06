'use strict';

/**
 * @ngdoc function
 * @name homunculusApp.controllers:hcFlashMessagesController
 * @description
 * # hcFlashMessagesController
 * Controller for managing Bootstrap-styled flash messages.
 */
angular.module('homunculusApp.controllers')
  .controller('hcFlashMessagesController', [
    'hcFlashMessagesService',
    function (FlashMessagesService) {

      // Maintain reference to controller "scope."
      var self = this;

      this.list = FlashMessagesService.flashMessages;

      this.close = function (index) {
        FlashMessagesService.removeFlashMessage(index);
      };

    }
  ]);
