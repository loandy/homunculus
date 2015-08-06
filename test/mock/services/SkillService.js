'use strict';

angular.module('mock.services').
  factory('MockSkillService', [
    '$q',
    function ($q) {

      return {
        'getSkillList': function () {

          var deferred = $q.defer();

          deferred.resolve([
            {
              'name': 'testingSkill',
              'description': 'Skill for writing unit tests.'
            }
          ]);

          return deferred.promise;
        }
      };

    }
  ]);