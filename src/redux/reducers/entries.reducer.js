const entriesReducer = (state = '', action) => {

    switch(action.type) {
        case 'SET_ENTRY':
            return action.payload
        default:
            return state
    }
}

export default entriesReducer