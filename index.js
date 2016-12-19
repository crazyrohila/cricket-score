#! /usr/bin/env node

var request = require('request'),
    colors = require('colors');

var PROVIDER  = 'http://cricapi.com',
    APIKEY    = 'fCEJ8IOaLhSjyDKOxkKqA7AqEbA3',
    SCOREAPI  = PROVIDER + '/api/cricketScore',
    LISTAPI   = PROVIDER + '/api/cricket';

var matchId = null;

if (process.argv && process.argv[2]) {
  matchId = process.argv[2];
}

getMatchInfo(matchId);

function getMatchInfo(matchID, callback) {
    request({
      url: matchID ? SCOREAPI : LISTAPI,
      method: matchID ? 'POST' : 'GET',
      json: true,
      body: {"apikey": APIKEY, "unique_id": matchID}
    }, function (error, response, body) {
      if (callback) {
        callback(error, response, body);
      }
      if (error) {
        console.log('Error accured when calling cricapi. Error:');
        console.log(error);
        return;
      }
      if (matchID) {
        console.log(
          'Score: ' + response.body.score.bgCyan.black + '\n'+
          'Summary: '+ response.body['innings-requirement'].underline.italic
        );
      } else {
        var matches = response.body && response.body.data;
        matches.forEach(function(match) {
          console.log(
            'Match ID: ' + match.unique_id.bgCyan.black + '\n'+
            'Summary: '+ match.title.underline.italic
          );
        });
      }
  });
}

module.exports = getMatchInfo;
