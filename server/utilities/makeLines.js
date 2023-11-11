const getDate = require('./getDate');
const fixTimestamp = require('./fixTimestamp');

/**
 * 
 * TO DO:
 * 
 * Change propety keys to match columns
 * in database. This will allow me to
 * simplify the function I use to
 * compare the api response to my
 * existing database data.
 */


function makeLines(apiData) {
    let lines = []
    for (let game of apiData) {
        for (let bookmaker of game.bookmakers) {
            for (let market of bookmaker.markets) {
                for (let outcome of market.outcomes) {
                    let marketObj = {
                        sport_title: game.sport_title,
                        odds_api_game_id: game.id,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        date: getDate(game.commence_time),
                        bookmaker: bookmaker.key,
                        market: market.key,
                        outcome: outcome.name,
                        price: outcome.price,
                        point: outcome.point,
                        last_update: fixTimestamp(market.last_update),
                        dupCheck: false,
                        dupTag: 0
                    }
                    lines.push(marketObj);
                }
            }
        }
    }
    return lines;
}

module.exports = makeLines;