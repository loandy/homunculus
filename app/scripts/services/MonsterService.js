'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusMonsterService
 * @description
 * # HomunculusMonsterService
 * Service for managing monsters.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusMonsterService', [
    '$http',
    '$q',
    'HomunculusUtilityService',
    'configurations',
    function ($http, $q, UtilityService, configurations) {

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
              deferred.resolve(data);
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
              deferred.resolve(UtilityService.objectToArray(data.results[0].data));
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'createMonster': function (monster) {

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