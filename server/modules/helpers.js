// used in makeGameID
function fixTimestamp(timestamp) {
    let fixedTimestamp = []
    for (let character of timestamp) {
        if (character === 'T') {
            fixedTimestamp.push(' ')
        } else if (character !== 'Z') {
            fixedTimestamp.push(character)
        }
    }

    // I do this because the odds-api timestamp goes to milliseconds and the scores-api doesn't. I think my solution is clunky and could backfire eventually. It would be better to get the ids to match by using logic regarding the (identical) times these (different) timestamps represent
    fixedTimestamp = fixedTimestamp.slice(0, -3)
    console.log(fixedTimestamp.join(''))
    return fixedTimestamp.join('')
}

// used in makeGameID, formattedResponse
function removeSpaces(string, replacementCharacter) {

    // validation if user foes not provide a replacementCharacter
    if (replacementCharacter === null) {
        replacementCharacter = ''
    }

    let unspaced = []
    for (let character of string) {
        if (character == ' ') {
            unspaced.push(replacementCharacter)
        } else {
            unspaced.push(character)
        }
    }
    return unspaced.join('')
}

// used in odds.router GET
function makeGameID(response) {
    let {sport_title, home_team, away_team, commence_time} = response

    home_team = removeSpaces(home_team)
    away_team = removeSpaces(away_team)
    commence_time = fixTimestamp(commence_time)
    return removeSpaces(`${sport_title}_${home_team}_${away_team}_${commence_time}`)
}

function formattedResponse(response) {
    //! obviously a bit limiting to use it this way
    //^ better to send response.data.response as the argument and map through that
    let formattedArray = response.map( game => {
        // console.log('GAME AT CURRENT ITERATION:', game)
        game.id = removeSpaces(`${game.league.name}_${game.teams.home.name}_${game.teams.away.name}_${game.game.date.date}_${game.game.date.time}`, '_')
        return game
    })

    return formattedArray
}

const makeDateString = (date) => {
    if (!date) {
        date = new Date()
    }
    
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

const helpers = {
    fixTimestamp,
    removeSpaces,
    makeGameID,
    formattedResponse,
    makeDateString
}

module.exports = helpers;