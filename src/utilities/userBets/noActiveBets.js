const isFinished = require("../isFinished"); 

function noActiveBets(entry, bets) {
  for (let bet of bets) {
    if (bet.entry_id === entry.id && !isFinished(bet)) {
      return false;
    }
  }
  return true;
}

module.exports = noActiveBets;