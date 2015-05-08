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
              'templateUrl': 'views/header.html'
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
        });
    }
  ]);
