function findWinner (game) {
    if (game.home_score > game.away_score) {
        return game.home;
    } else if (game.home_score < game.away_score) {
        return game.away ;
    } else if (game.home_score === game.away_score) {
        return 'PUSH';
    }
}

module.exports = findWinner;