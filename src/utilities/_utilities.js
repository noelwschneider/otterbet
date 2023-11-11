// imports
const convertToAmerican = require("./convertToAmerican");
const fixTimestamp = require("./dateTime/fixTimestamp");
const formatTimestamp = require("./dateTime/formatTimestamp");
const getBetPointsText = require("./getBetPointsText");
const getDate = require("./dateTime/getDate");
const getTime = require("./dateTime/getTime");
const isEntryMatch = require("./isEntryMatch");
const isFinished = require("./isFinished");
const makeGamesArray = require("./makeGamesArray");
const makeLines = require("./makeLines");
const noActiveBets = require("./noActiveBets");
const removeSpaces = require("./removeSpaces");

// export
const utilities = {
    convertToAmerican,
    fixTimestamp,
    formatTimestamp,
    getBetPointsText,
    getDate,
    getTime,
    isEntryMatch,
    isFinished,
    makeGamesArray,
    makeLines,
    noActiveBets,
    removeSpaces
}

module.exports = utilities;