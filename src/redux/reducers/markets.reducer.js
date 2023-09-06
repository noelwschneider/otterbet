const marketsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MARKETS':
            return action.payload;
        default:
            return state;
    }
}

export default marketsReducer