/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, voteClick }) => {
    return (
        <div>
            <p>{anecdote.content}</p>
            <div>
                <p>has {anecdote.votes} votes</p>
                <button onClick={voteClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () =>  {
    const dispatch  = useDispatch()
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))

    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote key={anecdote.id} anecdote={anecdote} voteClick={() => dispatch(anecdoteVote(anecdote.id))} />)
            }
        </div>
    )
}

export default Anecdotes