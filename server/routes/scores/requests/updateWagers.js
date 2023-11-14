async function updateWagers(connection, wagersToUpdate) {
    // Query to update wagers
    const updateTrueEntriesText = `
        UPDATE entries
        SET funds = funds + (
            CAST($2 as numeric) * 
            CAST($3 as numeric)
        )
        WHERE "id" = $1
    ;`

    const updateNullEntriesText = `
        UPDATE entries
        SET funds = funds + CAST($2 as numeric)
        WHERE "id" = $1
    ;`

    // Updating entries
    await Promise.all(wagersToUpdate.map(async wager => {
        const updateEntriesValues = [
            wager.entry_id,
            Number(wager.wager),
            Number(wager.price)
        ]
        let updateEntriesText
        if (wager.result === true) {
            updateEntriesText = updateTrueEntriesText
        } else if (wager.result === null) {
            updateEntriesText = updateNullEntriesText
        }
        await connection.query(updateEntriesText, updateEntriesValues)
    }))
}
module.exports = updateWagers;