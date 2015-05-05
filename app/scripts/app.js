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
              'controller': 'ProfileController',
              'controllerAs': 'ProfileController'
            },
            'alerts@main.profile': {
              'templateUrl': 'views/alerts.html',
              'controller': 'AlertController',
              'controllerAs': 'AlertController'
            }
          },
          'resolve': {
            'initialData': ['$q', 'ProfileService',
              function ($q, ProfileService) {
                // Retrieve list of profiles.
                var profileData = ProfileService.getAllProfiles().then(function (results) {
                  return JSON.parse(JSON.stringify(results));
                });

                // Wait on and compile all requested all.
                return $q.all([profileData]).then(function (results) {

                  var profiles = [];

                  results[0].results[0].data.forEach(function (profile) {
                    profiles.push(profile.row[0]);
                  });

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
