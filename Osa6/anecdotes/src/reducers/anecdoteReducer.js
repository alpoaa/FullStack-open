/* eslint-disable no-case-declarations */
const initialAnecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = initialAnecdotes.map(anecdoteObject)

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'NEW':
            return state.concat(action.payload)
        case 'VOTE':
            const anecdoteId     = action.payload.id
            const anecdoteVote   = state.find(anecdote => anecdote.id === anecdoteId)
            const anecdoteUpdate = {
                ...anecdoteVote,
                votes: anecdoteVote.votes + 1
            }
            return state.map(anecdote => anecdote.id !== anecdoteId ? anecdote : anecdoteUpdate)
        default:
            return state
    }
}

export const anecdoteCreate = (anecdote) => {
    return {
        type: 'NEW',
        payload: anecdoteObject(anecdote)
    }
} 

export const anecdoteVote = (id) => {
    return {
        type: 'VOTE',
        payload: { id }
    }
}

export default reducer