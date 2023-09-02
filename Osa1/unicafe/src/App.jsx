import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const Button = ({handleClick, buttonText}) => {
  return (
      <button onClick={handleClick}>{buttonText}</button>
  )
}

const StatisticsHeader = () => <div><h1>Statistics</h1></div>

const StatisticsLine = ({statistic, count}) => {
  return (
    <div>
      <p>{statistic} {count}</p>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <StatisticsHeader />
      <StatisticsLine statistic={'good'} count={good} />
      <StatisticsLine statistic={'neutral'} count={neutral} />
      <StatisticsLine statistic={'bad'} count={bad} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
        <Button handleClick={handleClickGood} buttonText={'good'} />
        <Button handleClick={handleClickNeutral} buttonText={'neutral'} />
        <Button handleClick={handleClickBad} buttonText={'bad'} />
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

export default App