const pool = require('../../../modules/pool');

function addBets(betslip) {
    const postText = `
        INSERT INTO bets (user_id, market_id, wager, bet_timestamp, entry_id)
        VALUES ($1, $2, $3, CURRENT_TIME AT TIME ZONE 'UTC', $4)
        ;
    `

    betslip.map(wager => {
        const postValues = [wager.user, wager.id, wager.wager, wager.entry_id];
        pool.query(postText, postValues);
    })
}

module.exports = addBets;