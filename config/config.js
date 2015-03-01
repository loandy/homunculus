'use strict';

angular.module('homunculusApp.services', [])
  .constant('configurations', {
    'neo4j': {
      'serviceRoot': '@@serviceRoot'
    }
  });
