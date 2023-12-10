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

  if (props.allVotes === 0)
  {
    return (
      <div>
        <h3>Statistics</h3>
        <p>No feedback given</p>
      </div>    
    )
  }

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.goodVotes} />
          <StatisticsLine text='Neutal' value={props.neutralVotes} />
          <StatisticsLine text='Bad' value={props.badVotes} />
          <StatisticsLine text='All' value={props.allVotes} />
          <StatisticsLine text='Average' value={(props.goodVotes - props.badVotes) / props.allVotes} />
          <StatisticsLine text='Positive' value={(props.goodVotes / props.allVotes) * 100 + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {

  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)
  const [all, setAll]         = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header />
      <VoteButton txt={'Good'} handleClick={handleClickGood}/>
      <VoteButton txt={'Neutral'} handleClick={handleClickNeutral}/>
      <VoteButton txt={'Bad'} handleClick={handleClickBad}/>
      <Statistics goodVotes={good} neutralVotes={neutral} badVotes={bad} allVotes={all}/>
    </div>
  )
}

export default App