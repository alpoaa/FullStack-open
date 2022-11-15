import {useState} from 'react'

const Header = () => <div><h1>Give feedback</h1></div>

const FeedBackBtn = ({handleClick, buttonTxt}) => <button onClick={handleClick}>{buttonTxt}</button>

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const countAll = () => good + neutral + bad
  const countPositive = () => good / countAll() * 100   
  const countAverage = () => (good - bad) / countAll()
  
  if (countAll() === 0)
  {
    return (
      <div>
        <h4>No feedback given</h4>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='All' value={countAll()} />
        <StatisticsLine text='Average' value={countAverage()} />
        <StatisticsLine text='Positive' value={countPositive()} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const handleClickGood    = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad     = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <FeedBackBtn buttonTxt='good' handleClick={handleClickGood} />
      <FeedBackBtn buttonTxt='neutral' handleClick={handleClickNeutral} />
      <FeedBackBtn buttonTxt='bad' handleClick={handleClickBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App