

async function updateLines(connection, linesToUpdate) {
    const updateMarketText = `
        UPDATE "markets"
        SET result =
        CASE -- OPEN A
        WHEN market = 'spreads'
            THEN CASE -- OPEN B
            WHEN outcome = $2
                THEN CASE -- OPEN C
                    WHEN $4 + point < 0
                        THEN FALSE
                    WHEN $4 + point > 0
                        THEN TRUE
                    ELSE NULL
                    END -- END C
            WHEN outcome = $3
                THEN CASE -- OPEN D
                WHEN $5 + point < 0
                    THEN FALSE
                WHEN $5 + point > 0
                    THEN TRUE
                ELSE NULL
                END -- END D
            END -- END B
        WHEN market = 'h2h'
            THEN CASE -- OPEN E
            WHEN outcome = $6
                THEN TRUE
            ELSE FALSE
            END -- END E
        WHEN market = 'totals'
            THEN CASE -- OPEN F
                WHEN outcome = 'Over'
                    THEN CASE -- OPEN G
                    WHEN point < $7
                        THEN TRUE
                    WHEN point > $7
                        THEN FALSE
                    WHEN point = $7
                        THEN NULL
                    END -- END G
                WHEN outcome = 'Under'
                    THEN CASE -- OPEN H
                    WHEN point > $7
                        THEN TRUE
                    WHEN point < $7
                        THEN FALSE
                    WHEN point = $7
                        THEN NULL
                    END -- END H
                END -- END F
            END -- END A
        WHERE game_id = $1
    ;`
    /*
        1 - id
        2 - home_team
        3 - away_team
        4 - home_margin
        5 - away_margin
        6 - winning_team
        7 - total_score
    */

    // Updating markets
    await Promise.all(linesToUpdate.map( async market => {
        const updateMarketValues = [
            market.id,
            market.home,
            market.away,
            market.home_margin,
            market.away_margin,
            market.winning_team,
            market.total
        ];
        await connection.query(updateMarketText, updateMarketValues);
    }));
    return true;
}

module.exports = updateLines;