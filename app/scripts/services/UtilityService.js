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
        /**
         * Converts line break characters to line break elements for presentation in
         * HTML documents.
         *
         * @param {string} string - The string to convert line breaks for.
         * @returns {string}
         */
        'nl2br': function (string) {

          var result = '';

          // Check whether the replace function exists - argument provided may
          // not be a string.
          if ('function' === typeof string.replace) {
            result = string.replace(/(?:\r\n|\r|\n)/g, '<br>');
          }

          return result;

        },
        /**
         * Checks whether an object is usable.
         *
         * @param {Object} object - The object to perform checking for.
         * @returns {boolean}
         */
        'isNonEmptyObject': function (object) {
          return object && 'null' !== object && 'undefined' !== object;
        },
        /**
         * Converts an object into an array.
         *
         * @param {Object} object - The object to convert into an array.
         */
        'objectToArray': function (object) {

          var result = object;

          // Skip conversion if the object is already an array.
          if (!Array.isArray(object) && this.isNonEmptyObject(object)) {

            result = Object.keys(object).map(function (key) {
              return object[key];
            });

          }

          return result;

        },
        /**
         * Attempts to parse JSON-formatted attributes on an object back into objects.
         *
         * @param {Object} object - The object to parse attributes for.
         * @returns {Object}
         */
        'parseObject': function (object) {

          if (this.isNonEmptyObject(object)) {

            var objectKeys = Object.keys(object);
            var objectKeysLength = objectKeys.length;

            for (var i = 0; i < objectKeysLength; i++) {

              // Convert properties that are stringified JSON objects.
              try {
                object[objectKeys[i]] = JSON.parse(object[objectKeys[i]]);
              } catch (e) {
                // Do nothing.  Here to catch exception for attempting to parse a
                // non-JSON value.
              }

            }

          }

          return object;

        },
        /**
         * Generates a "lookup hash" object for an array of objects.
         *
         * @param {Object[]} objectArray - The array of objects to create a lookup hash for.
         * @param {string} keyField - The attribute to key the lookup hash with.
         * @returns {}
         */
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
        /**
         * Insert an object into an array in lexicographic order based on its name
         * attribute.
         *
         * @param {Object} insertElement - The object to insert into array.
         * @param {Object[]} insertArray - The array to receive the given object.
         */
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
        /**
         * Calculate ability modifier.
         *
         * @param {number} value - The value to calculate the modifier for.
         * @returns {number}
         */
        'calculateModifier': function (value) {

          var modifier = Math.floor((value - 10) / 2);

          return modifier;

        },
        /**
         * Calculate proficiency bonus.
         *
         * @param {number} level - The character level to calculate the proficiency bonus for.
         * @returns {number}
         */
        'calculateProficiencyBonus': function (level) {

          var modifier = Math.ceil(level / 4) + 1;

          return modifier;

        }
      };

    }
  ]);