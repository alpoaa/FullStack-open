const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GOOD':
            const changeStateGood = {...state, good: state.good + 1}
            return changeStateGood
        case 'OK':
            const changeStateOk = {...state, ok: state.ok + 1}
            return changeStateOk
        case 'BAD':
            const changeStateBad = {...state, bad: state.bad + 1}
            return changeStateBad
        case 'ZERO':
            return initialState
        default:
            return state
    }
}

export default counterReducer