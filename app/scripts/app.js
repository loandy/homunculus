'use strict';

/**
 * @ngdoc overview
 * @name homunculusApp
 * @description
 * # homunculusApp
 *
 * Main module of the application.
 */
angular
  .module('homunculusApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'ui.sortable',
    'angularModalService',
    'angular-uuid',
    'ngTagsInput',
    'homunculusApp.services',
    'homunculusApp.controllers',
    'homunculusApp.directives'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Default path.
      $urlRouterProvider.otherwise('/');

      $stateProvider.
        state('main', {
          'abstract': true
        }).
        state('main.home', {
          'url': '/',
          'views': {
            'content@': {
              'templateUrl': 'views/home.html'
            }
          }
        })
        .state('main.profile', {
          'url': '/profile',
          'views': {
            'content@': {
              'templateUrl': 'views/profile.html',
              'controller': 'hcProfileController',
              'controllerAs': 'HomunculusProfileController'
            }
          },
          'resolve': {
            'initialData': ['$q', 'HomunculusProfileService',
              function ($q, ProfileService) {
                // Retrieve list of profiles.
                return ProfileService.getAllProfiles().then(function (results) {

                  var profiles = [];

                  results.forEach(function (profile) {
                    profiles.push(profile.row[0]);
                  });

                  profiles.sort(ProfileService.helper.alphaSort);

                  return {
                    'profiles': profiles
                  };

                });

              }
            ]
          }
        })
        .state('main.character', {
          'url': '/character',
          'views': {
            'content@': {
              'templateUrl': 'views/character.html'
            }
          }
        })
        .state('main.encounter', {
          'url': '/encounter',
          'views': {
            'content@': {
              'templateUrl': 'views/encounter.html'
            }
          }
        })
        .state('main.monster', {
          'url': '/monster',
          'views': {
            'content@': {
              'templateUrl': 'views/monster.html'
            }
          }
        });
    }
  ]);