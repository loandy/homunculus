'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusEncounterFormService
 * @description
 * # HomunculusSelectEncounterFormService
 * Service for managing encounter forms.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusEncounterFormService', [
    '$http',
    '$q',
    'HomunculusCharacterService',
    'configurations',
    function ($http, $q, CharacterService, configurations) {

      return {
        'createEncounterForm': {
          'encounterParticipants': [],
          'addParticipants': function (template, participants) {

            var self = this;

            var experienceChart = CharacterService.getExperienceChart();

            participants.forEach(function (participant) {

              participant.template = template;
              participant.nextLevelXp = experienceChart[participant.level];

              self.encounterParticipants.push(participant);

            });

          }
        }
      };

    }
  ]);