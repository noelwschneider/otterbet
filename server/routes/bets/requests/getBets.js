const pool = require('../../../modules/pool');

function getBets(req, res) {
    const queryText = `
        SELECT
            bets.id AS "id",
            wager,
            outcome,
            entry_id,
            bet_timestamp,
            market,
            point,
            price,
            result,
            games.id AS game_id,
            home,
            away,
            "date",
            "time",
            league,
            status
        FROM bets
        	JOIN markets
        		on markets.id = bets.market_id
            JOIN games
        		on games.id = markets.game_id
        WHERE user_id = $1
        ORDER BY 
            "date" ASC,
            "time" ASC,
            home ASC
        ;
    `
    const queryValues = [req.query.id];

    pool.query(queryText, queryValues)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error in bets get query:', error);
            res.sendStatus(500);
        })
}

module.exports = getBets;