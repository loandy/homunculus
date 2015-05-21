'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusProfileService
 * @description
 * # HomunculusProfileService
 * Service for managing profiles.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusProfileService', [
    '$http',
    '$cookies',
    '$q',
    'HomunculusUtilityService',
    'configurations',
    function ($http, $cookies, $q, UtilityService, configurations) {

      return {
        get currentProfile () {

          var profile = {};

          try {

            if (!this._currentProfile) {
              profile = JSON.parse($cookies.currentProfile);
            } else {
              profile = this._currentProfile;
            }

          } catch (e) {
            console.log(e.message);
          } finally {
            return profile;
          }

        },
        set currentProfile (profile) {

          this._currentProfile = profile;
          $cookies.currentProfile = JSON.stringify(profile);

        },
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
        'getProfile': function (profileNodeUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (p:Profile) WHERE p.uuid={uuid} RETURN p',
              'parameters': {
                'uuid': profileNodeUuid
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
        'getAllProfiles': function () {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (p:Profile) RETURN p'
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
        'createProfile': function (profileNode) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (p:Profile {profile}) RETURN p',
              'parameters': {
                'profile': profileNode
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
        'deleteProfile': function (profileNodeUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (p:Profile) OPTIONAL MATCH (p)-[r]-() WHERE p.uuid={uuid} DELETE p, r',
              'parameters': {
                'uuid': profileNodeUuid
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