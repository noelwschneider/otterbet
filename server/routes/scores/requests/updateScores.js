const {
    getUpdateScoreQueryText,
    getUpdateScoreQueryValues
} = require('../../../modules/utilities');


async function updateScores(connection, gamesToUpdate, competition) {
    const updateScoreText = getUpdateScoreQueryText(competition);
    await Promise.all(gamesToUpdate.map( async game => {
        const updateValues = await getUpdateScoreQueryValues(competition, game);
        connection.query(updateScoreText, updateValues);
    }))
    return true;
}
module.exports = updateScores;