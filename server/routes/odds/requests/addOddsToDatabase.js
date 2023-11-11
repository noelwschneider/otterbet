async function addOddsToDatabase(connection, oddsFromDatabase, oddsFromApi) {
    try {
        const extractRows = [];
        await oddsFromDatabase.map(async line => {
            if (line.length !== 0) {
                await extractRows.push(line);
            }
        })

        let counter = 0;
        const linesToSend = [];
        // If no existing lines, send all lines to database
        if (extractRows.length === 0) {
            for (let line of oddsFromApi) {
                line.marketString = `${line.game_id}_${line.market}_${line.outcome}`;
                linesToSend.push(line);
            }
        // If existing lines, send only updated lines to database
        } else {
            for (let line of oddsFromApi) {
                line.marketString = `${line.game_id}_${line.market}_${line.outcome}`;
                for (let row of extractRows) {
                    let rowString = `${row[0].game_id}_${row[0].market}_${row[0].outcome}`
                    const stringCheck = line.marketString === rowString;
                    const priceCheck = line.price !== Number(row[0].price);
                    const pointCheck = line.point !== Number(row[0].point);
                    const undefinedCheck = line.point !== undefined && Number(row[0].point) !== undefined;
                    if (stringCheck && (priceCheck || (pointCheck && undefinedCheck))) {
                        linesToSend.push(line);
                    }
                    counter++;
                }
            }
        } 

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
        await Promise.all(linesToSend.map(async line => {
            const oddsQueryValues = [
                line.bookmaker,
                line.marketString,
                line.game_id,
                line.outcome,
                line.market,
                line.point,
                line.price,
                line.last_update
            ];
            await connection.query(oddsQueryText, oddsQueryValues);
        }));
        return true
    } catch (error) {
        console.error('error in addOddsToDatabase', error);
        throw error;
    }
}
module.exports = addOddsToDatabase;