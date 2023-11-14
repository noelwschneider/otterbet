async function getWagersToUpdate(connection, linesToUpdate) {
    // Query to get id and result for each changed wager with a payout
    const fetchWagersText = `
    SELECT 
        markets."id" AS market_id,
        bets."id" AS bets_id,
        entry_id,
        result,
        wager,
        price
    FROM markets
        JOIN bets
            on markets."id" = bets.market_id
    WHERE 
        markets.game_id = $1
        AND (
            result <> FALSE
            OR RESULT IS NULL
        )
    ;`

    // Get list of wagers to update from the database
    const wagersToUpdate = await Promise.all(
        linesToUpdate.map(async market => {
            const responseRow = await connection.query(fetchWagersText, [market.id])
            return responseRow;
        })
    )

    const extractRows = []
    wagersToUpdate.map(async wager => {
        if (wager.rows.length !== 0) {
            await extractRows.push(wager.rows)
        }
    })

    // Flattening array from previous query
    const flattenArray = (arrayToFlatten) => {
        if (arrayToFlatten.length === 0) {
            return arrayToFlatten
        };
        let arrayToReturn = Promise.all(arrayToFlatten.reduce(async (accumulator, currentValue) => {
            return await accumulator.concat(currentValue);
        }));
        return arrayToReturn;
    }
    const mergedWagerArrays = await flattenArray(extractRows);

    return mergedWagerArrays;
}

module.exports = getWagersToUpdate;