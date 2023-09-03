const oddsReducer = (state = [{
    game_id: 'example game id',
    bookmaker: 'example bookmaker',
    market: 'h2h',
    outcome: 'MIN',
    price: 2.5,
    point: null,
    last_update: "2023-09-02T15:07:46Z"
}], action) => {
    switch (action.type) {
        case 'UPDATE_ODDS':
            return action.payload;
        default:
            return state;
    }
}

export default oddsReducer