function addToBetslip(user, betslip, game, outcome, market) {
    const {
        away,
        date,
        time,
        competition,
        home,
        id,
        markets
    } = game;


    for (let line of markets) {
        if (line.tag === `${outcome}_${market}`) {
            for (let bet of betslip) {
                if (bet.id === line.id) {
                    return;
                }
            }
            line.wager = 0;
            line.user = user.id;
            line.home_team = home;
            line.away_team = away;
            line.commence_time = time;
            line.commence_date = date;
            line.game_id = id;
            line.competition = competition;
            return line;
        }
    }
}

module.exports = addToBetslip;