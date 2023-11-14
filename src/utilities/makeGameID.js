const removeSpaces = require('./removeSpaces');
const fixTimestamp = require('./dateTime/fixTimestamp');

function makeGameID(response) {
    let {sport_title, home_team, away_team, commence_time} = response
  
    home_team = removeSpaces(home_team)
    away_team = removeSpaces(away_team)
    commence_time = fixTimestamp(commence_time)
    return removeSpaces(`${sport_title}_${home_team}_${away_team}_${commence_time}`)
}

module.exports = makeGameID;