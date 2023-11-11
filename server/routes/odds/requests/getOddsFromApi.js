const oddsAPIKey = process.env.ODDS_API_KEY
const axios = require('axios');
const makeLines = require('../../../utilities/makeLines');

/**
 * 
 * TO DO:
 * 
 * Write function to create request
 * URL string. Increase flexibility
 * by allowing it to handle different
 * parameters.
 * 
 * ---
 * 
 * Make a class for odds and use it for
 * this return value. Include the getGameId
 * function as a method.
 * 
 */


async function getOddsFromApi(sport) {
    try {
        const oddsResponse = await axios.get(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?sport=${sport}&markets=h2h,spreads,totals&bookmakers=betmgm&apiKey=${oddsAPIKey}`);
        return await makeLines(oddsResponse.data);
    } catch (error) {
        console.error('error in getApiOdds', error);
        throw error;
    }
}
module.exports = getOddsFromApi;


// METHODS TO INCLUDE IN FUTURE ODDS CLASS
function isMatch(line, game) {
    const lineString = `${line.sport_title}_${line.home_team}_${line.away_team}_${line.date}_${line.dupTag}`;
    const gameString = `${game.league}_${game.home}_${game.away}_${game.date}_${game.dupTag}`;
    return lineString === gameString;
}
function getGameId(games) {
    this.lines.map(line => {
        for (let game of games) {
            if (isMatch(line, game)) {
                line.game_id = game.id;
                break;
            }
        }
    });
    /**
     * refactor: reduce loops
     * 
     * -pass a shallow copy of games
     * array, then remove games when 
     * they are matched to a line.
     */
}