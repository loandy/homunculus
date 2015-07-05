'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusUtilityService
 * @description
 * # HomunculusUtilityService
 * Service for providing miscellaneous utility helper functions.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusUtilityService', [
    function () {

      return {
        'objectToArray': function (object) {

          var result = object;

          if (!Array.isArray(object)) {

            result = Object.keys(object).map(function (key) {
              return object[key];
            });

          }

          return result;

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
        }
      };

    }
  ]);