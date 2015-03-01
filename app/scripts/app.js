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
    'ui.router',
    'homunculusApp.controllers',
    'homunculusApp.services'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Default path.
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          'abstract': true,
          'views': {
            'header@': {
              'templateUrl': 'views/header.html',
            },
            'footer@': {
              'templateUrl': 'views/footer.html'
            }
          }
        })
        .state('main.home', {
          'url': '/',
          'views': {
            'content@': {
              'templateUrl': 'views/home.html',
              'controller': 'MainCtrl'
            }
          }
        });
    }
  ]);
