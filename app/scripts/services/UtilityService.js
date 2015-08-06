'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:hcUtilityService
 * @description
 * # hcUtilityService
 * Service for providing miscellaneous utility helper functions.
 */
angular.module('homunculusApp.services')
  .factory('hcUtilityService', [
    '$q',
    function ($q) {

      return {
        'isNonEmptyObject': function (object) {
          return object && 'null' !== object && 'undefined' !== object;
        },
        'objectToArray': function (object) {

          var result = object;

          if (!Array.isArray(object)) {

            result = Object.keys(object).map(function (key) {
              return object[key];
            });

          }

          return result;

        },
        // Copies values for attributes that exist in the destination object,
        // from the source object.
        'transfer': function (destination, source) {
          Object.keys(destination).forEach(function (key) {
            destination[key] = source[key] ? source[key] : '';
          });
        },
        'parseObject': function (object) {

          if (this.isNonEmptyObject(object)) {

            var objectKeys = Object.keys(object);
            var objectKeysLength = objectKeys.length;

            for (var i = 0; i < objectKeysLength; i++) {

              // Only convert properties that are stringified JSON objects.
              try {
                object[objectKeys[i]] = JSON.parse(object[objectKeys[i]]);
              } catch (e) {
                // Do nothing.
              }

            }

          }

          return object;

        },
        'generateLookup': function (objectArray, keyField) {

          var deferred = $q.defer();

          if (keyField) {

            var lookup = {};

            var arrayLength = objectArray.length;

            if (Array.isArray(objectArray) && arrayLength > 0) {

              for (var i = 0; i < arrayLength; i++) {

                if (objectArray[i][keyField]) {
                  lookup[objectArray[i][keyField]] = objectArray[i];
                }

              }

            } else {

              deferred.reject('Cannot generate lookup table on provided array.');

            }

            deferred.resolve(lookup);

          } else {
            deferred.reject('Cannot generate lookup table on unspecified key field.');
          }

          return deferred.promise;

        },
        'insertAlpha': function (insertElement, insertArray) {

          var listLength = insertArray.length;
          var isListEmpty = (listLength === 0);

          if ( isListEmpty ) {
            insertArray.push(insertElement);
          } else {

            if (listLength === 1) {

              if (insertElement.name < insertArray[0]) {
                insertArray.unshift(insertElement);
              } else {
                insertArray.pop(insertElement);
              }

            } else {

              // Binary search-like algorithm to find insertion point.
              // Array should be lexicographically pre-sorted.
              var i = 0;
              var low = 0;
              var high = listLength - 1;
              var mid;

              while (high - low > 1) {

                mid = Math.floor((low + high) / 2);

                if (insertElement.name < insertArray[mid].name) {
                  high = mid;
                } else {
                  low = mid;
                }

              }

              if (insertElement.name < insertArray[low].name) {
                insertArray.unshift(insertElement);
              } else if (insertElement.name > insertArray[high].name) {
                insertArray.push(insertElement);
              } else {
                insertArray.splice(high, 0, insertElement);
              }

            }

          }
        },
        'calculateModifier': function (value) {

          var modifier = Math.floor((value - 10) / 2);

          return modifier;

        },
        'calculateProficiencyBonus': function (level) {

          var modifier = Math.ceil(level / 4) + 1;

          return modifier;

        }
      };

    }
  ]);