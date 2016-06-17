var app = angular.module('swaggerApp', ['ui.router', 'ngSanitize', 'angular.filter', 'jsonFormatter']);

app.run(['$rootScope', '$http', '$state', '$window' , '$log' , '$location', function($rootScope, $http, $state, $window, $log, $location) {
    // $rootScope._user = null;
    console.log('app.run = ', $state);
    $state.go('document.landing');

    // if(!Enduser.isAuthenticated()) {
    //     console.log('app run condition');
    //   $state.go('home.login');
    // } else {
    //     console.log('app run condition 2');
    //     $state.go('home.app.view');
    // }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, notifyService) {
        
        console.log('fromState = ', fromState.name, 'toState = ', toState.name);
        // if(fromState.name == 'swagger') {
        //     $state.go('swagger', {param: 'godam'});
        // }

    });
}])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});