var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code
    this.addNewGame = function (gameObj) {
      var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;

      if (parseInt(gameObj.homeTeamScore) === parseInt(gameObj.opponentScore)) {
        gameObj.won = true;
      } else {
        gameObj.won = false;
      }

      return $http({
        url: url,
        method: 'POST',
        data: gameObj
      })

    }

    this.getTeamData = function (team) {

      var defer = $q.defer();
      var url = 'https://api.parse.com/1/classes/' + team;

      $http({
        url: url,
        method: 'GET'
      }).then(function (data) {
        var results = data.data.results;

        var wins, losses = 0;

        for (var i = 0; i < results.length; i++) {
          if (results[i].won === true) {
            wins++;
          } else {
            losses++;
          }
        }
        results.wins = wins;
        results.losses = losses;
        defer.resolve(results.data);
      })

      return defer.promise;
    }

});
