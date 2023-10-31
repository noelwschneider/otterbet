import isFinished from "./isFinished";

export default function noActiveBets(entry, bets) {
  for (let bet of bets) {
    if (bet.entry_id === entry.id && !isFinished(bet)) {
      return false;
    }
  }
  return true;
}

