const pool = require('../../../modules/pool');

function updateFunds(wagerSum, entry) {
    const putText = `
        UPDATE entries 
        SET funds=funds-$1
        WHERE id = $2
        ;
    `
    const putValues = [wagerSum, entry.id];

    pool.query(putText, putValues);
}

module.exports = updateFunds;