'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcWeaponService
 * @description
 * # hcWeaponService
 * Service for managing weapons.
 */
angular.module('homunculusApp.services')
  .factory('hcWeaponService', [
    '$http',
    '$q',
    '$cacheFactory',
    'uuid',
    'hcUtilityService',
    'configurations',
    function ($http, $q, $cacheFactory, uuid, UtilityService, configurations) {

      var cache = $cacheFactory('WeaponCache');

      var Item = {
        'name': '',
        'cost': '',
        'weight': ''
      };

      var Weapon = {
        'category': '',
        'baseDamage': {
          'diceNumber': '',
          'diceType': ''
        },
        'damageType': '',
        'properties': []
      };

      angular.extend(Weapon, Item);

      return {
        'getAllWeapons': function () {

          var results = cache.get('allWeapons');
          var deferred = $q.defer();

          if (!results) {

            var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
            var queries = {
              'statements': [{
                'statement': 'MATCH (w:Weapon) RETURN w'
              }]
            };

            $http.post(endpoint, queries)
              .success(function (data, status, headers, config) {

                results = [];

                UtilityService.objectToArray(data.results[0].data).forEach(function (element) {

                  var weapon = UtilityService.parseObject(element.row[0]);

                  results.push(weapon);

                });

                cache.put('allWeapons', results);

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
        'createWeaponObject': function () {
          return angular.copy(Weapon);
        },
        'createWeapon': function (weaponForm) {

          // Generate weapon object from form values.
            var weapon = {
              'uuid': uuid.v1()
            };

          // Iterate through form-filled properties.
            Object.getOwnPropertyNames(Object.getPrototypeOf(weaponForm)).forEach(function (property) {

            // Using instanceof instead of typeof to avoid null issues.
              if (weaponForm[property] instanceof Object) {
                weapon[property] = JSON.stringify(weaponForm[property]);
              } else {
                weapon[property] = weaponForm[property];
              }

          });

          var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
            var queries = {
              'statements': [{
                'statement': 'CREATE (w:Weapon {weapon}) RETURN w.uuid',
                'parameters': {
                  'weapon': weapon
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