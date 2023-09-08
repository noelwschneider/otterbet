

const myBetsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MYBETS':
            return action.payload;
        default:
            return state;
    }
}

export default myBetsReducer