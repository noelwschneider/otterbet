const { getDate } = require('../../..//modules/utilities');

async function getGamesFromDatabase(connection, startDate, endDate) {
    try {
        // Get games to give markets an appropriate game ID
        const queryText = `
            SELECT
                "id",
                "date",
                "time",
                league,
                home,
                away
            FROM "games"
            WHERE "date" BETWEEN 
                $1
                AND $2
            ORDER BY
                "date" ASC,
                "time" ASC
            ;
        `;
        const queryValues = [startDate, endDate];
        const gamesArray = (await connection.query(queryText, queryValues)).rows;
        // Formatting dates to match marketsArray dates
        for (let game of gamesArray) {
            game.date = await getDate(game.date);
            game.dupTag = 0;
        };
        return gamesArray;
    } catch (error) {
        console.error('error in getGamesFromDatabase', error);
        throw error;
    }
}
module.exports = getGamesFromDatabase;