var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    // routing configuration code
    $urlRouterProvider
      .otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        controller: 'homeCtrl',
        templateUrl: 'js/home/homeTmpl.html'
      })

      .state('teams', {
        url: '/teams/:team',
        controller: 'teamCtrl',
        resolve: {
          teamData: function (teamService, $stateParams) {
            return teamService.getTeamData($stateParams.team);
          }
        },
        templateUrl: 'js/teams/teamTmpl.html'
      })
});
