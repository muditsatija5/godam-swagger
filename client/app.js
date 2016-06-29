var app = angular.module('swaggerApp', ['ui.router', 'ngSanitize', 'angular.filter', 'jsonFormatter', 'pascalprecht.translate']);

app.run(['$rootScope', '$http', '$state', '$window' , '$log' , '$location', 
    function($rootScope, $http, $state, $window, $log, $location) {
    $state.go('document.landing');

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if(fromState.name == '' && toState.name == 'swagger') {
            event.preventDefault();
            $state.go('document.landing');
        } else {
            return;
        }

    });
}])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.config(['$translateProvider', 'langEn', function ($translateProvider, langEn) {
  $translateProvider.translations('en', langEn);
 
  $translateProvider.preferredLanguage('en');
}]);