const gamesReducer = (state = [{
    id: 'test game id',
    home_team: 'test home team',
    away_team: 'test away team',
    commence_time: '2023-09-03 15:24:24',
    competition: 'test competition'
}], action) => {
    switch (action.type) {
        case 'UPDATE_GAMES':
            return action.payload;
        default:
            return state;
    }
}

export default gamesReducer