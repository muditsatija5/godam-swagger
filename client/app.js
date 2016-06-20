var app = angular.module('swaggerApp', ['ui.router', 'ngSanitize', 'angular.filter', 'jsonFormatter']);

app.run(['$rootScope', '$http', '$state', '$window' , '$log' , '$location', function($rootScope, $http, $state, $window, $log, $location) {
    // $rootScope._user = null;
    // console.log('$location = ', $location.$$path);
    $state.go('document.landing');

    // if($location.$$path == '' || $location.$$path == '/') {
    //     console.log('app run condition 1');
    //     $state.go('document.landing');
    // } else {
    //     console.log('app run condition 2');
    //     $state.go('swagger');
    // }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        
        // console.log('fromState = ', fromState.name, 'toState = ', toState.name);
        if(fromState.name == '' && toState.name == 'swagger') {
            // console.log('$on 1');
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
});