'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcCharacterService
 * @description
 * # hcCharacterService
 * Service for managing characters.
 */
angular.module('homunculusApp.services')
  .factory('hcCharacterService', [
    '$http',
    '$q',
    '$cacheFactory',
    'uuid',
    'hcSkillService',
    'hcUtilityService',
    'configurations',
    function ($http, $q, $cacheFactory, uuid, SkillService, UtilityService, configurations) {

      var cache = $cacheFactory('CharacterCache');

      var Character = {
        'name': '',
        'race': '',
        'classes': '',
        'level': '',
        'alignment': '',
        'xp': '',
        'height': {},
        'weight': '',
        'sex': '',
        'abilities': {
          'strength': {},
          'dexterity': {},
          'constitution': {},
          'wisdom': {},
          'intelligence': {},
          'charisma': {}
        },
        'currentHitPoints': '',
        'maximumHitPoints': '',
        'hitDice': '',
        'ideals': '',
        'bonds': '',
        'flaws': '',
        'background': '',
        'attacks': [],
        'spells': [],
        'features': [],
        'feats': [],
        'skills': {},
        'conditions': {}
      };

      var Attack = {
        'name': '',
        'attackModifier': '',
        'damageModifier': ''
      };

      var Feature = {
        'level': '',
        'name': '',
        'description': ''
      };

      var Feat = {
        'name': '',
        'description': ''
      };

      var experienceChart = [
        0,
        300,
        900,
        2700,
        6500,
        14000,
        23000,
        34000,
        48000,
        64000,
        85000,
        100000,
        120000,
        140000,
        165000,
        195000,
        225000,
        265000,
        305000,
        355000
      ];

      var calculateCharacterFields = function (character) {

        // Calculate proficiency bonus.
        var proficiencyBonus = 0;

        if (typeof character.proficiencyBonus !== 'number') {

          proficiencyBonus = UtilityService.calculateProficiencyBonus(character.level);
          character.proficiencyBonus = proficiencyBonus;

        } else {
          proficiencyBonus = character.proficiencyBonus;
        }

        // Calculate ability score modifiers.
        var abilities = Object.keys(character.abilities);
        var abilitiesLength = abilities.length;

        for (var i = 0; i < abilitiesLength; i++) {

          var abilityModifier = 0;

          if (typeof character.abilities[abilities[i]].modifier !== 'number') {

            abilityModifier = UtilityService.calculateModifier(character.abilities[abilities[i]].score);
            character.abilities[abilities[i]].modifier = abilityModifier;

          } else {
            abilityModifier = character.abilities[abilities[i]].modifier;
          }

          // Calculate save modifier as well.
          if (true === character.abilities[abilities[i]].proficient) {
            character.abilities[abilities[i]].save = abilityModifier + proficiencyBonus;
          } else {
            character.abilities[abilities[i]].save = abilityModifier;
          }

        }

        return character;

      };

      return {
        'helper': {
          'alphaSort': function (a, b) {

            var result = 0;

            if (a.name < b.name) {
              result = -1;
            } else if (a.name > b.name) {
              result = 1;
            }

            return result;

          }
        },
        'getCharacter': function (characterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) WHERE c.uuid={uuid} RETURN c',
              'parameters': {
                'uuid': characterUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {

              var character = UtilityService.parseObject(data);

              deferred.resolve(character);

            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'getAllCharacters': function () {

          var results = cache.get('allCharacters');
          var deferred = $q.defer();

          if (!results) {

            var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
            var queries = {
              'statements': [{
                'statement': 'MATCH (c:Character) RETURN c'
              }]
            };

            $http.post(endpoint, queries)
              .success(function (data, status, headers, config) {

                results = [];

                UtilityService.objectToArray(data.results[0].data).forEach(function (element) {

                  var character = UtilityService.parseObject(element.row[0]);
                  character = calculateCharacterFields(character);

                  results.push(character);

                });

                cache.put('allCharacters', results);

                deferred.resolve(results);

              })
              .error(function (data, status, headers, config) {
                deferred.reject(status);
              });

          } else {
            deferred.resolve(results);
          }

          return deferred.promise;

        },
        'getAllProfileCharacters': function (profileUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) WHERE c.profileUuid = {profileUuid} RETURN c',
              'parameters': {
                'profileUuid': profileUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {

              var results = [];

              UtilityService.objectToArray(data.results[0].data).forEach(function(element) {
                results.push(UtilityService.parseObject(element.row[0]));
              });

              deferred.resolve(results);

            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },

        'getExperienceChart': function () {
          return experienceChart;
        },
        'createCharacterObject': function () {

          var characterObject = angular.copy(Character);

          SkillService.getSkillList().then(function (results) {

            // Initialize character skill list.
            if (Array.isArray(results) && results.length > 0) {

              var resultsLength = results.length;

              for (var i = 0; i < resultsLength; i++) {

                if (!characterObject.skills[results[i].name]) {
                  characterObject.skills[results[i].name] = {};
                }

                characterObject.skills[results[i].name].modifier = 0;
                characterObject.skills[results[i].name].ability = results[i].ability;
                characterObject.skills[results[i].name].proficient = false;

              }

            }

          });

          // Intialize ability scores.
          var abilitiesKeys = Object.keys(characterObject.abilities);
          var abilitiesKeysLength = abilitiesKeys.length;

          for (var i = 0; i < abilitiesKeysLength; i++) {

            characterObject.abilities[abilitiesKeys[i]].score = 10;
            characterObject.abilities[abilitiesKeys[i]].proficient = false;

          }

          return characterObject;

        },
        'createAttackObject': function () {
          return angular.copy(Attack);
        },
        'createFeatureObject': function () {
          return angular.copy(Feature);
        },
        'createFeatObject': function () {
          return angular.copy(Feat);
        },
        'createCharacter': function (characterForm) {

          // Generate character object from form values.
          var character = {
            'uuid': uuid.v1()
          };

          // Calculate proficiency bonus.
          var proficiencyBonus = UtilityService.calculateProficiencyBonus(characterForm.level);
          character.proficiencyBonus = proficiencyBonus;

          // Iterate through form-filled properties.
          Object.getOwnPropertyNames(characterForm).forEach(function (property) {

            var attribute = characterForm[property];

            // Using instanceof instead of typeof to avoid null issues.
            if (attribute instanceof Object) {

              switch (property) {
                case 'abilities':
                  // Calculate ability score modifiers.
                  var abilities = Object.keys(attribute);
                  var abilitiesLength = abilities.length;

                  for (var i = 0; i < abilitiesLength; i++) {

                    var abilityModifier = UtilityService.calculateModifier(attribute[abilities[i]].score);
                    attribute[abilities[i]].modifier = abilityModifier;

                    // Calculate save modifier as well.
                    if (true === attribute[abilities[i]].proficient) {
                      attribute[abilities[i]].saveModifier = abilityModifier + proficiencyBonus;
                    } else {
                      attribute[abilities[i]].saveModifier = abilityModifier;
                    }

                  }

                  break;
              }

              character[property] = JSON.stringify(attribute);

            } else {

              if (!attribute) {
                character[property] = '';
              } else {
                character[property] = attribute;
              }

            }

          });

          // Initialize hit points.
          character.currentHitPoints = characterForm.maximumHitPoints;

          // Calculate passive perception.
          character.passivePerception = 10 + characterForm.abilities.wisdom.modifier + proficiencyBonus;

          character.nextLevelXp = experienceChart[characterForm.level];

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (c:Character {character}) RETURN c.uuid',
              'parameters': {
                'character': character
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'deleteCharacter': function (characterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) OPTIONAL MATCH (c)-[r]-() WHERE c.uuid={uuid} DELETE c, r',
              'parameters': {
                'uuid': characterUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'deleteAllProfileCharacters': function (profileUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) OPTIONAL MATCH (c)-[r]-() WHERE c.profileUuid={profileUuid} DELETE c, r',
              'parameters': {
                'profileUuid': profileUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        }
      };

    }
  ]);