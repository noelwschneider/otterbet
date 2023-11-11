const pool = require('../../../modules/pool');

function getEntries(user) {
    const getText = `
        SELECT *
        FROM entries
        WHERE 
            user_id = $1
        ORDER BY
            default_entry DESC NULLS LAST,
            "name" ASC
        ;
    `
    const getValues = [user.id];
    return pool.query(getText, getValues);
}

module.exports = getEntries;