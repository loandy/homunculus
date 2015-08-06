'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcConditionService
 * @description
 * # hcConditionService
 * Service for managing conditions and status effects.
 */
angular.module('homunculusApp.services')
  .factory('hcConditionService', [
    '$http',
    '$q',
    'hcUtilityService',
    'configurations',
    function ($http, $q, UtilityService, configurations) {

      var Condition = {
        'name': '',
        'description': ''
      };

      return {
        'getCondition': function (conditionUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Condition) WHERE c.uuid={uuid} RETURN c',
              'parameters': {
                'uuid': conditionUuid
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {

              var condition = UtilityService.parseObject(data);

              deferred.resolve(condition);

            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
        'getAllConditions': function () {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Condition) RETURN c'
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
        'createConditionObject': function () {
          return angular.copy(Condition);
        },
        'createCondition': function (condition) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (c:Condition {condition}) RETURN c.uuid',
              'parameters': {
                'condition': condition
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
        'deleteCondition': function (conditionUuid) {

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'MATCH (c:Condition) OPTIONAL MATCH (c)-[r]-() WHERE c.uuid={uuid} DELETE c, r',
              'parameters': {
                'uuid': conditionUuid
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