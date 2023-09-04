const marketsReducer = (state = [], action) => {
    switch (action.type) {
        case 'MARKETS ACTION.TYPE GOES HERE':
            return action.payload;
        default:
            return state;
    }
}

export default marketsReducer