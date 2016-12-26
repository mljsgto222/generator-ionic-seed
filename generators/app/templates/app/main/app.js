'use strict';
var ionicApp = angular.module('<%= app.name %>', ['ionic', 'ui.router', 'templates'])
.run([function () {

}])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'app.html',
            abstract: true,
        })
        .state('app.start', {
            url: '/start',
            views: {
                menuContent: {
                    templateUrl: 'start.html'
                }
            }
        })
        ;
    $urlRouterProvider.otherwise('/app/start');
}]);
