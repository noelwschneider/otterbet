const { findWinner } = require("../../../modules/utilities");

async function getLinesToUpdate(gamesToUpdate) {
// Creating an array to update markets as needed
    const marketResults = [];
    await Promise.all(gamesToUpdate.map( async game => { 
        const market = {
            id: game.id,
            home: game.home,
            away: game.away,
            home_margin: game.home_score - game.away_score,
            away_margin: game.away_score - game.home_score,
            winning_team: findWinner(game),
            total: game.home_score + game.away_score
        }
        await marketResults.push(market);
    }));
    return marketResults;
}

module.exports = getLinesToUpdate;