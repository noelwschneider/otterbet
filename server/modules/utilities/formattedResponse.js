import { removeSpaces } from "./_helpers";


export default function formattedResponse(response) {
  //! obviously a bit limiting to use it this way
  //^ better to send response.data.response as the argument and map through that
  let formattedArray = response.map(game => {
    game.id = removeSpaces(`${game.league.name}_${game.teams.home.name}_${game.teams.away.name}_${game.game.date.date}_${game.game.date.time}`, '_')
    return game
  })

  return formattedArray
}