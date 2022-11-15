import { useState } from "react"

const Header = () => <h2>Anecdote of the day</h2>
const CurrentAnecdote = ({anecdote}) => <p>{anecdote}</p>
const NextAnecdoteBtn = ({btnText, handleClick}) => <button onClick={handleClick}>{btnText}</button>
const VoteAnecdoteBtn = ({btnText, handleClick}) => <button onClick={handleClick}>{btnText}</button>

const CurrentVoteInfo = ({voteCount, btnText, handleClick}) => {
  return (
    <div>
      <p>Has {voteCount} votes</p>
      <VoteAnecdoteBtn btnText={btnText} handleClick={handleClick} />
    </div>
  )
}

const MostVotedAnecdote = ({anecdotes, votes}) => {

  const mostVotedIdx = () => {
    const copyOfVotes = [...votes]
    const maxValue    = Math.max(...copyOfVotes)
    const index       = copyOfVotes.indexOf(maxValue)

    return index
  }

  const votedAnecdote      = () => anecdotes[mostVotedIdx()]
  const votedAnecdoteCount = () => votes[mostVotedIdx()]

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{votedAnecdote()}</p>
      <p>Has {votedAnecdoteCount()} votes</p>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selectedAnecdote, setSelectedAnecdote]             = useState(0)
  const [votes, setVotes]                                   = useState(new Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    console.log('random', randomNum)
    setSelectedAnecdote(randomNum)
  }

  const voteAnecdote = () => {
    const copyOfVotes = [...votes]

    copyOfVotes[selectedAnecdote] += 1
    setVotes(copyOfVotes)
  }
  
  return (
    <div>
      <Header />
      <CurrentAnecdote anecdote={anecdotes[selectedAnecdote]} />
      <CurrentVoteInfo voteCount={votes[selectedAnecdote]} btnText='vote' handleClick={voteAnecdote}/>
      <NextAnecdoteBtn btnText='next anecdote' handleClick={nextAnecdote}/>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App;
