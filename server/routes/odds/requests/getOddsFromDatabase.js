/**
 * 
 * TO DO:
 * 
 * Refactor this function to make
 * a single query to the database.
 * Facilitate this with a funciton
 * to generate the query text from
 * an array of markets.
 * 
 */


async function getOddsFromDatabase(connection, oddsFromApi) {
    try {
        // Getting existing markets from database
        // Making array of markets to check against
        const queryText = `
            SELECT
                "id",
                game_id,
                market,
                outcome,
                point,
                price
            FROM markets
            WHERE 
                game_id = $1
                AND outcome = $2
                AND market = $3
            ORDER BY last_update
            LIMIT 1
            ;
        `;
        const oddsFromDatabase = await Promise.all(oddsFromApi.map(async line => {
            const queryValues = [
                line.game_id,
                line.outcome,
                line.market
            ];
            const responseRow = await connection.query(queryText, queryValues);
            return responseRow;
        }))
        return oddsFromDatabase;
    } catch (error) {
        console.error('error in getOddsFromDatabase', error);
    }
}
module.exports = getOddsFromDatabase;