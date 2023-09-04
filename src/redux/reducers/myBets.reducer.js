const myBetsReducer = (state = [], action) => {
    switch (action.type) {
        case 'MY BETS ACTION.TYPE GOES HERE':
            return action.payload;
        default:
            return state;
    }
}

export default myBetsReducer