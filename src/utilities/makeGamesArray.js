const getDate = require('./dateTime/getDate');
const getTime = require('./dateTime/getTime');

function makeGamesArray(apiData) {
    let arrayToReturn = [];
    for (let game of apiData) {
        let gameObj = {
            id: game.id,
            home_team: game.home_team,
            away_team: game.away_team,
            date: getDate(game.commence_time),
            time: getTime(game.commence_time),
            competition: game.sport_key,
            
        }
        arrayToReturn.push(gameObj);
    }
    return arrayToReturn;
}

module.exports = makeGamesArray;