// Update the scores and status of games that have had changes
//^ baseball and soccer need slightly different query text
const getUpdateScoreQueryText = competition => {
    switch (competition) {
        case 'american-football':
            return `
            UPDATE "games"
            SET
                status = $1,
                timer = $2,
                home_score = $3,
                home_1q = $4,
                home_2q = $5,
                home_3q = $6,
                home_4q = $7,
                home_overtime = $8,
                away_score = $9,
                away_1q = $10,
                away_2q = $11,
                away_3q = $12,
                away_4q = $13,
                away_overtime = $14
            WHERE id = $15
            ;
            `
        case 'baseball':
            return `
            UPDATE "games"
            SET
                status = $1,
                timer = $2,
                home_score = $3,
                home_inning_1 = $4
                home_inning_2 = $5
                home_inning_3 = $6
                home_inning_4 = $7
                home_inning_5 = $8
                home_inning_6 = $9
                home_inning_7 = $10
                home_inning_8 = $11
                home_inning_9 = $12
                home_extra_innings = $13,
                away_score = $14,
                away_inning_1 = $15
                away_inning_2 = $16
                away_inning_3 = $17
                away_inning_4 = $18
                away_inning_5 = $19
                away_inning_6 = $20
                away_inning_7 = $21
                away_inning_8 = $22
                away_inning_9 = $23
                away_extra_innings = $24,
                away_overtime = $25
            WHERE id = $26
            ;
        `
        default:
            break;
    }
}

module.exports = getUpdateScoreQueryText;