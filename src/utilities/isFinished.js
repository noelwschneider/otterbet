

export default function isFinished(game) {
  if ( game.status == "FT" || game.status == "AOT" ) {
    return true;
  }
  return false;
}