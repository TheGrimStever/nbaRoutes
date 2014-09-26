var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider
    .when('/', {
      template: '<div class="home"> NBA ROUTER! </div>',
    })
    .when('/teams/:team', {
      templateUrl: 'js/teams/teamTmpl.html',
      controller: 'teamCtrl',
      resolve: {
        teamData: function($route, teamService){
          return teamService.getTeamData($route.current.params.team);
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    })

})