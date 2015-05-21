'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusCharacterService
 * @description
 * # HomunculusCharacterService
 * Service for managing characters.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusCharacterService', [
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
        'getCharacter': function (characterNodeUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) WHERE c.uuid={uuid} RETURN c',
              'parameters': {
                'uuid': characterNodeUuid
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
        'getAllCharacters': function () {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Character) RETURN c'
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
              deferred.resolve(UtilityService.objectToArray(data.results[0].data));
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'createCharacter': function (characterNode) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (c:Character {character}) RETURN c.uuid',
              'parameters': {
                'character': characterNode
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