function matchGamesToMarkets(games, markets) {
    let arrayToReturn = []
    for (let game of games) {
        for (let market of markets) {
            if (market[0].game_id === game.id) {
                game.markets = market;
                arrayToReturn.push(game);
            }
        }     
    }
    return arrayToReturn;
}

module.exports = matchGamesToMarkets;