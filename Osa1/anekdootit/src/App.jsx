import { useState } from 'react'

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdote}</h3>
    </div>
  )
}

const AnecdoteVote = ({voted}) => {
  return (
    <div>
      <p>Has {voted} votes</p>
    </div>
  )
}

const Button = ({handleClick, buttonText}) => { 
  return (
    <button onClick={handleClick}>{buttonText}</button>
  )
}

const AnecdoteMostVoted = ({anecdote, votes}) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const selectRandomAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelectedAnecdote(randomAnecdote)
  }

  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selectedAnecdote] += 1
    setVotes(newVotes)

    const mostVotedAnecdote = newVotes.indexOf(Math.max(...newVotes))
    if (newVotes[selectedAnecdote] > votes[mostVotedAnecdote]) {
      setMostVoted(selectedAnecdote)
    }
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selectedAnecdote]} />
      <AnecdoteVote voted={votes[selectedAnecdote]} />
      <Button handleClick={voteAnecdote} buttonText={'vote'} />
      <Button handleClick={selectRandomAnecdote} buttonText={'next anecdote'} />
      <AnecdoteMostVoted anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
