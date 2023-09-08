const betSlipReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BETSLIP':
            return action.payload
        case 'SET_BETSLIP':
            return [...state, action.payload];
        case 'UPDATE_WAGER':
            return action.payload
        case 'DELETE_WAGER':
            return action.payload
        case 'CLEAR_BETSLIP':
            return []
        default:
            return state;
    }
}

export default betSlipReducer