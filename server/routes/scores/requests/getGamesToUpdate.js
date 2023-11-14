const { makeDateString } = require('../../../modules/utilities');

async function getGamesToUpdate(connection, scores, competition, date) {
    // Get list of (potential) games to update from database
    const gamesToUpdateText = `
    SELECT 
        games."id",
        status,
        timer
    FROM "games"
        JOIN "competitions"
            on games.league = competitions.title
    WHERE
        competitions.sports_api_name = $1
        AND "status" <> 'FT'
        AND "status" <> 'AOT'
        AND "date" <= $2
    ;`
    const gamesToUpdateValues = [competition, date];
    const potentialGamesToUpdate = await connection.query(gamesToUpdateText, gamesToUpdateValues);

    // Creating an array of game data which has changed since the last database update
    let gamesToUpdate = []
    await Promise.all(potentialGamesToUpdate.rows.map( game => {
        for (let response of scores.data.response) {
            // Find the matching game, then check if its status or timer are different
            if (game.id === response.game.id && (game.status !== response.status || game.timer !== response.timer)) {
                gamesToUpdate.push({
                    id: game.id,
                    status: response.game.status.short,
                    timer: response.game.status.time,
                    home: response.teams.home.name,
                    home_score: response.scores.home.total,
                    home_1q: response.scores.home.quarter_1,
                    home_2q: response.scores.home.quarter_2,
                    home_3q: response.scores.home.quarter_3,
                    home_4q: response.scores.home.quarter_4,
                    home_overtime: response.scores.home.overtime,
                    away: response.teams.away.name,
                    away_score: response.scores.away.total,
                    away_1q: response.scores.away.quarter_1,
                    away_2q: response.scores.away.quarter_2,
                    away_3q: response.scores.away.quarter_3,
                    away_4q: response.scores.away.quarter_4,
                    away_overtime: response.scores.away.overtime,
                })
            }
        }
    }))
    return gamesToUpdate;
}

module.exports = getGamesToUpdate;