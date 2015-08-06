'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcEncounterService
 * @description
 * # hcEncounterService
 * Service for managing encounters.
 */
angular.module('homunculusApp.services')
  .factory('hcEncounterService', [
    '$http',
    '$q',
    'hcUtilityService',
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
        'getEncounter': function (encounterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (e:Encounter) WHERE e.uuid={uuid} RETURN e',
              'parameters': {
                'uuid': encounterUuid
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
        'getAllEncounters': function () {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (e:Encounter) RETURN e'
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
        'createEncounter': function (encounter) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (e:Encounter {encounter}) RETURN e.uuid',
              'parameters': {
                'encounter': encounter
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
        'deleteEncounter': function (encounterUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (e:Encounter) OPTIONAL MATCH (e)-[r]-() WHERE e.uuid={uuid} DELETE e, r',
              'parameters': {
                'uuid': encounterUuid
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