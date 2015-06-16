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
    'angular-uuid',
    'homunculusApp.controllers',
    'homunculusApp.services'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Default path.
      $urlRouterProvider.otherwise('/');

      $stateProvider.
        state('main', {
          'abstract': true,
          'views': {
            'header@': {
              'templateUrl': 'views/header.html',
              'controller': 'HomunculusHeaderController',
              'controllerAs': 'HomunculusHeaderController'
            },
            'footer@': {
              'templateUrl': 'views/footer.html'
            }
          }
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
              'controller': 'HomunculusProfileController',
              'controllerAs': 'HomunculusProfileController'
            },
            'alerts@main.profile': {
              'templateUrl': 'views/alerts.html',
              'controller': 'HomunculusAlertController',
              'controllerAs': 'HomunculusAlertController'
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
              'templateUrl': 'views/character.html',
              'controller': 'HomunculusCharacterController',
              'controllerAs': 'HomunculusCharacterController',
            },
            'alerts@main.character': {
              'templateUrl': 'views/alerts.html',
              'controller': 'HomunculusAlertController',
              'controllerAs': 'HomunculusAlertController'
            }
          },
          'resolve': {
            'initialData': [
              '$q',
              'HomunculusProfileService',
              'HomunculusCharacterService',
              function ($q, ProfileService, CharacterService) {

                // Retrieve list of characters belonging to the current profile.
                return CharacterService.getAllProfileCharacters(ProfileService.currentProfile.uuid)
                  .then(function (results) {

                    var characters = [];

                    results.forEach(function (character) {
                      characters.push(character.row[0]);
                    });

                    characters.sort(CharacterService.helper.alphaSort);

                    return {
                      'characters': characters
                    };

                });

              }
            ]
          }
        })
        .state('main.monster', {
          'url': '/monster',
          'views': {
            'content@': {
              'templateUrl': 'views/monster.html',
              'controller': 'HomunculusMonsterController',
              'controllerAs': 'HomunculusMonsterController'
            },
            'alerts@main.encounter': {
              'templateUrl': 'views/alerts.html',
              'controller': 'HomunculusAlertController',
              'controllerAs': 'HomunculusAlertController'
            }
          },
          'resolve': {
            'initialData': [
              '$q',
              'HomunculusSkillService',
              function ($q, SkillService) {

                // Retrieve list skills.
                return SkillService.getSkillList()
                  .then(function (results) {

                    return {
                      'masterSkillList': results
                    };

                });

              }
            ]
          }
        });
    }
  ]);
