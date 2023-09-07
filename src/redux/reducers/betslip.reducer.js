const betSlipReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BETSLIP':
            return action.payload
        case 'SET_BETSLIP':
            return [...state, action.payload];
        case 'UPDATE_WAGER':
            return action.payload
        default:
            return state;
    }
}

export default betSlipReducer