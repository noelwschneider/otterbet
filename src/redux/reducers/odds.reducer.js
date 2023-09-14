const oddsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ODDS':
            return action.payload;
        default:
            return state;
    }
}

export default oddsReducer