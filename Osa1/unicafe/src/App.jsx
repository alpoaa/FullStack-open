import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h3>Give feedback</h3>
    </div>
  )
}

const VoteButton = ({txt, handleClick}) => {
  return (
    <button onClick={handleClick}>{txt}</button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h3>Statistics</h3>
      <p>Good: {props.goodVotes}</p>
      <p>Neutral: {props.neutralVotes}</p>
      <p>Bad: {props.badVotes}</p>
    </div>
  )
} 

const App = () => {

  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <VoteButton txt={'Good'} handleClick={handleClickGood}/>
      <VoteButton txt={'Neutral'} handleClick={handleClickNeutral}/>
      <VoteButton txt={'Bad'} handleClick={handleClickBad}/>
      <Statistics goodVotes={good} neutralVotes={neutral} badVotes={bad}/>
    </div>
  )
}

export default App