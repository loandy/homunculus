'use strict';

angular.module('mock.services').
  factory('MockCharacterService', [
    '$q',
    function ($q) {

      return {
        'createCharacterObject': function () {
          return {};
        },
        'getAllWeapons': function () {

          var deferred = $q.defer();

          deferred.resolve([
            {}
          ]);

          return deferred.promise;

        }
      };

    }
  ]);