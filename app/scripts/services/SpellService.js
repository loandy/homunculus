'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcSpellService
 * @description
 * # hcSpellService
 * Service for managing spells.
 */
angular.module('homunculusApp.services')
  .factory('hcSpellService', [
    '$http',
    '$q',
    '$cacheFactory',
    'uuid',
    'hcUtilityService',
    'configurations',
    function ($http, $q, $cacheFactory, uuid, UtilityService, configurations) {

      var cache = $cacheFactory('SpellCache');

      var Spell = {
        'level': '',
        'school': '',
        'castingTime': '',
        'range': '',
        'components': '',
        'duration': '',
        'description': ''
      };

      return {
        'getAllSpells': function () {

          var results = cache.get('allSpells');
          var deferred = $q.defer();

          if (!results) {

            var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
            var queries = {
              'statements': [{
                'statement': 'MATCH (s:Spell) RETURN s'
              }]
            };

            $http.post(endpoint, queries)
              .success(function (data, status, headers, config) {

                results = [];

                UtilityService.objectToArray(data.results[0].data).forEach(function (element) {

                  var spell = UtilityService.parseObject(element.row[0]);

                  results.push(spell);

                });

                cache.put('allSpells', results);

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
        'createSpellObject': function () {
          return angular.copy(Spell);
        },
        'createSpell': function (spellForm) {

          console.log(spellForm);

          // Generate spell object from form values.
          var spell = {
            'uuid': uuid.v1()
          };

          // Iterate through form-filled properties.
          Object.getOwnPropertyNames(spellForm).forEach(function (property) {

            // Using instanceof instead of typeof to avoid null issues.
            if (spellForm[property] instanceof Object) {
              spell[property] = JSON.stringify(spellForm[property]);
            } else {
              spell[property] = spellForm[property];
            }

          });

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
          var queries = {
            'statements': [{
              'statement': 'CREATE (s:Spell {spell}) RETURN s.uuid',
              'parameters': {
                'spell': spell
              }
            }]
          };
          var deferred = $q.defer();

          $http.post(endpoint, queries)
            .success(function (data, status, headers, config) {
              deferred.resolve(spell);
            })
            .error(function (data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        },
      };

    }
  ]);