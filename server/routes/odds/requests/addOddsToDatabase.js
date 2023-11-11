async function addOddsToDatabase(connection, oddsFromDatabase, oddsFromApi) {
    try {
        const extractRows = [];
        await oddsFromDatabase.map(async wager => {
            if (wager.rows.length !== 0) {
                await extractRows.push(wager.rows);
            }
        })
        console.log('extract rows from old markets');

        const marketsToSend = []
        for (let market of oddsFromApi) {
            let marketString = `${market.game_id}_${market.market}_${market.outcome}`;
            market.marketString = marketString;
            for (let row of extractRows) {
                let rowString = `${row[0].game_id}_${row[0].market}_${row[0].outcome}`
                const stringCheck = marketString === rowString
                const priceCheck = market.price !== Number(row[0].price)
                const pointCheck = market.point !== Number(row[0].point)
                const undefinedCheck = market.point !== undefined && Number(row[0].point) !== undefined
                if (stringCheck && (priceCheck || (pointCheck && undefinedCheck))) {
                    marketsToSend.push(market)
                }
            }
        }
        console.log('make array of markets to send');

        // Sending updated markets to the database
        const oddsQueryText = `
            INSERT INTO markets (
                bookmaker, 
                market_string,
                game_id, 
                outcome, 
                market, 
                point, 
                price, 
                last_update
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await Promise.all(marketsToSend.map(async market => {
            const oddsQueryValues = [
                market.bookmaker,
                market.marketString,
                market.game_id,
                market.outcome,
                market.market,
                market.point,
                market.price,
                market.last_update
            ];
            await connection.query(oddsQueryText, oddsQueryValues);
        }));
        console.log('send updated markets to database');
    } catch (error) {
        console.error('error in addOddsToDatabase', error);
    }
}
module.exports = addOddsToDatabase;