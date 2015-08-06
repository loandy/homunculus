'use strict';

describe('Controller: hcCharacterCreationFormController', function () {

  var controller;

  beforeEach(function () {

    // Load controllers module.
    module('homunculusApp.controllers');

    // Load mock services module.
    module('mock.services');

    // Initialize the controller.
    inject(function ($injector) {

      var $controller = $injector.get('$controller');
      var hcCharacterService     = $injector.get('MockCharacterService');
      var hcProfileService       = $injector.get('MockProfileService');
      var hcSkillService         = $injector.get('MockSkillService');
      var hcFlashMessagesService = $injector.get('MockFlashMessagesService');
      var hcUtilityService       = $injector.get('MockUtilityService');

      controller = $controller('hcCharacterCreationFormController', {
        'hcCharacterService':     hcCharacterService,
        'hcProfileService':       hcProfileService,
        'hcSkillService':         hcSkillService,
        'hcFlashMessagesService': hcFlashMessagesService,
        'hcUtilityService':       hcUtilityService,
        'initialData': {}
      });
    });

  });

  it('should have a flag for controlling the display of the character creation form', function () {
      expect(controller.isVisible).toBeDefined();
  });

  it('should have a flag for having submitted the character creation form', function () {
      expect(controller.isSubmitted).toBeDefined();
  });

  it('should have a method for opening the character creation form', function () {
      expect(controller.open).toBeDefined();
  });

  describe('Method: open', function () {

    it('should initialize the character model object for the character creation form if it is not already defined', function () {

      expect(controller.character).toBeUndefined();
      controller.open();
      expect(controller.character).toBeDefined();

    });

    it('should set the flag to display the character creation menu', function () {

      controller.open();
      expect(controller.isVisible).toBe(true);

    });

  });

});