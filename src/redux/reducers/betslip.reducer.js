const betSlipReducer = (state = ['hiiiii'], action) => {
    switch (action.type) {
        case 'FETCH_BETSLIP':
            return action.payload
        case 'SET_BETSLIP':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default betSlipReducer