'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcMonsterService
 * @description
 * # hcMonsterService
 * Service for managing monsters.
 */
angular.module('homunculusApp.services')
  .factory('hcMonsterService', [
    '$http',
    '$q',
    'uuid',
    'hcUtilityService',
    'configurations',
    function ($http, $q, uuid, UtilityService, configurations) {

      var Monster = {
        'name': '',
        'size': '',
        'armorClass':  '',
        'challenge': '',
        'abilities': {
          'strength': '',
          'dexterity': '',
          'constitution': '',
          'wisdom': '',
          'intelligence': ''
        },
        'savingThrows': {
          'strength': '',
          'dexterity': '',
          'constitution': '',
          'wisdom': '',
          'intelligence': ''
        },
        'maximumHitPoints': '',
        'hitDice': '',
        'traits': [],
        'actions': [],
        'skills': [],
        'damageVulnerabilities': '',
        'damageResistances': '',
        'damageImmunities': '',
        'conditionImmunities': ''
      };

      var Trait = {
        'name': '',
        'description': ''
      };

      var Action = {
        'name': '',
        'description': ''
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
        'getMonster': function (monsterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (m:Monster) WHERE m.uuid={uuid} RETURN m',
              'parameters': {
                'uuid': monsterUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {
              deferred.resolve(UtilityService.parseObject(data));
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'getAllMonsters': function () {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (m:Monster) RETURN m'
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {

              var results = [];

              UtilityService.objectToArray(data.results[0].data).forEach(function(element) {

                var monster = UtilityService.parseObject(element.row[0]);

                results.push(monster);

              });

              deferred.resolve(results);

            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'createMonsterObject': function () {
          return angular.copy(Monster);
        },
        'createTraitObject': function () {
          return angular.copy(Trait);
        },
        'createActionObject': function () {
          return angular.copy(Action);
        },
        'createMonster': function (monsterForm) {

          // Generate monster object from form values.
          var monster = {
            'uuid': uuid.v1()
          };

          Object.getOwnPropertyNames(Object.getPrototypeOf(monsterForm)).forEach(function (property) {

            // Using instanceof instead of typeof to avoid null issues.
            if (monster[property] instanceof Object) {
              monster[property] = JSON.stringify(monster[property]);
            } else {
              monster[property] = monster[property];
            }

          });

          // Initialize hit points.
          monster.currentHitPoints = monster.maximumHitPoints;

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (m:Monster {monster}) RETURN m.uuid',
              'parameters': {
                'monster': monster
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
        'deleteMonster': function (monsterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (m:Monster) OPTIONAL MATCH (m)-[r]-() WHERE m.uuid={uuid} DELETE m, r',
              'parameters': {
                'uuid': monsterUuid
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