const convertToAmerican = require('./convertToAmerican');

function addAmericanPrice(games) {
    for (let game of games) {
        game.markets.map( market => {
            market.price = {
                european: market.price,
                american: convertToAmerican(market.price)
            }
        })
    }
    return games;
}
module.exports = addAmericanPrice;