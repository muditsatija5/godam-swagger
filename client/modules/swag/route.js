'use strict';

var app = angular.module('swaggerApp');

app.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider
  .state('swagger', {
    url: ':parentUrl/:dynamicUrl',
    params: {param: null},
    views: {
      'app-view': {
        templateUrl: '/modules/swag/swag.html',
        controller: 'swagController'
      }
    }
  })
}]);