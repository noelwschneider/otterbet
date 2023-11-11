function fixTimestamp(timestamp) {
    let fixedTimestamp = [];
    for (let character of timestamp) {
        if (character === 'T') {
            fixedTimestamp.push(' ');
        } else if (character !== 'Z') {
            fixedTimestamp.push(character);
        }
    }

    //! I do this because the odds-api timestamp goes to milliseconds and the scores-api doesn't. I think my solution is clunky and could backfire eventually. It would be better to get the ids to match by using logic regarding the (identical) times these (different) timestamps represent
    fixedTimestamp = fixedTimestamp.slice(0, -3);
    return fixedTimestamp.join('');
}

module.exports = fixTimestamp;