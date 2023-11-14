// imports
const addToBetslip = require("./addToBetslip");
const convertToAmerican = require("./convertToAmerican");
const findWinner = require("./findWinner");
const fixTimestamp = require("./dateTime/fixTimestamp");
const formatTimestamp = require("./dateTime/formatTimestamp");
const getAvailableOddsCellText = require("./getAvailableOddsCellText");
const getBetPointsText = require("./getBetPointsText");
const getDate = require("./dateTime/getDate");
const getTime = require("./dateTime/getTime");
const getUpdateScoreQueryText = require("./getUpdateScoreQueryText");
const getUpdateScoreQueryValues = require("./getUpdateScoreQueryValues");
const isDateString = require("./dateTime/isDateString");
const isEntryMatch = require("./isEntryMatch");
const isFinished = require("./isFinished");
const makeGamesArray = require("./makeGamesArray");
const makeLines = require("./makeLines");
const noActiveBets = require("./noActiveBets");
const removeSpaces = require("./removeSpaces");
const makeDateString = require("./dateTime/makeDateString");
const formattedResponse = require("./formattedResponse");
const makeGameID = require("./makeGameID");

// export
const utilities = {
    addToBetslip,
    convertToAmerican,
    findWinner,
    fixTimestamp,
    formattedResponse,
    formatTimestamp,
    getAvailableOddsCellText,
    getBetPointsText,
    getDate,
    getTime,
    getUpdateScoreQueryText,
    getUpdateScoreQueryValues,
    isDateString,
    isEntryMatch,
    isFinished,
    makeDateString,
    makeGameID,
    makeGamesArray,
    makeLines,
    noActiveBets,
    removeSpaces
}

module.exports = utilities;