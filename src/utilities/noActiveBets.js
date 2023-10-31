import isFinished from "./isFinished";

const countBetsToRender = (entry, userBets, upcomingBetsView) => {
  let count = 0;
  for (let bet of userBets) {
    if (bet.entry_id === entry[selectedEntry].id
      && upcomingBetsView === !isFinished(bet)) {
      count++
    }
  }
  return count
}

let noActiveBets = countBetsToRender() === 0 && upcomingBetsView