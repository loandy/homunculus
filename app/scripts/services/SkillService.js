'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcSkillService
 * @description
 * # hcSkillService
 * Service for managing character skills.
 */
angular.module('homunculusApp.services')
  .factory('hcSkillService', [
    '$q',
    function ($q) {

      var Skill = {
        'name': '',
        'ability': '',
      };

      var skillList = {
        'Strength': [
          'Athletics'
        ],
        'Dexterity': [
          'Acrobatics',
          'Sleight of Hand',
          'Stealth'
        ],
        'Intelligance': [
          'Arcana',
          'History',
          'Investigation',
          'Nature',
          'Religion'
        ],
        'Wisdom': [
          'Animal Handling',
          'Insight',
          'Medicine',
          'Perception',
          'Survival'
        ],
        'Charisma': [
          'Deception',
          'Intimidation',
          'Performance',
          'Persuasion'
        ]
      };

      return {
        'getSkillList': function() {

          var deferred = $q.defer();

          var skills = [];

          Object.keys(skillList).forEach(function (ability) {

            for (var i = 0, l = skillList[ability].length; i < l; i++) {

              var skill = angular.copy(Skill);
              skill.name = skillList[ability][i];
              skill.ability = ability;

              skills.push(skill);

            }

          });

          deferred.resolve(skills);

          return deferred.promise;

        },
        'createSkillObject': function () {
          return angular.copy(Skill);
        }
      };

    }
  ]);