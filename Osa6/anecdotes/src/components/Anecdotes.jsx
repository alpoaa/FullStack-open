/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

import Filter from './Filter'

const Anecdote = ({ anecdote, voteClick }) => {
    return (
        <div>
            <p>{anecdote.content}</p>
            <p>has {anecdote.votes} votes</p>
            <button onClick={voteClick}>vote</button>  
        </div>
    )
}

const Anecdotes = () =>  {
    const dispatch  = useDispatch()

    const filteredAnecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => 
                                anecdote.content.toLowerCase().includes(filter.toLowerCase()))
                        .sort((a, b) => b.votes - a.votes)
    })

    return (
        <div>
            <h4>Anecdotes</h4>
            <Filter />
            {filteredAnecdotes.map(anecdote => 
                <Anecdote key={anecdote.id} anecdote={anecdote} voteClick={() => dispatch(anecdoteVote(anecdote.id))} />)
            }
        </div>
    )
}

export default Anecdotes