'use strict';

var app = angular.module('swaggerApp');

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('document', {
    url: 'docs/',
    views: {
      'app-view': {
        templateUrl: '/modules/documentation/document.html'
      }
    }
  })
  .state('document.landing', {
    url: 'landing/',
    views: {
      'top-bar': {
        templateUrl: '/modules/common/top-navbar.html',
        controller: 'docController'
      },
      'side-bar': {
        templateUrl: '/modules/documentation/doc-sidebar.html',
        controller: 'docController'
      },
      'content-view': {
        templateUrl: '/modules/documentation/doc-content.html'
      }
    }
  })
  .state('document.landing.content', {
    url: 'content/',
    params: {apiObj: null, definitions: null},
    views: {
      'inner-view': {
        templateUrl: '/modules/documentation/detail.html',
        controller: 'docController'
      }
    }
  })
}]);