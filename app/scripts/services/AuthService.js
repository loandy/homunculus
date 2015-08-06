'use strict';

/**
 * @ngdoc service
 * @name homunculusApp.services:HomunculusAuthService
 * @description
 * # HomunculusAuthService
 * Service for providing authentication.
 */
angular.module('homunculusApp.services')
  .factory('HomunculusAuthService', [
    '$http',
    '$q',
    'configurations',
    function ($http, $q, configurations) {

      var currentProfile;

      return {
        'logIn': function (form) {

            var endpoint = configurations.neo4j.serviceRoot + 'transaction/commit';
            var queries = {
              'statements': [{
                'statement': 'MATCH (p:Profile) WHERE p.name={profileName} RETURN p',
                'parameters': {
                  'profileName': form.profileName
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
        'logOut': function () {

          currentProfile = null;

        },
        'isLoggedIn': function () {

          if (!currentProfile) {
            return false;
          } else {
            return true;
          }

        },
        'currentProfile': function () {
          return currentProfile;
        },
      };

    }
  ]);
