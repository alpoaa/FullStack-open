import {useState} from 'react'

const Header = () => (<div><h1>Give feedback</h1></div>)

const FeedBackBtn = ({handleClick, buttonTxt}) => (<button onClick={handleClick}>{buttonTxt}</button>)

const Statistics = ({good, neutral, bad}) => {

  const countAll = () => good + neutral + bad
  const countPositive = () => {
    let ret = 0
    if (countAll() === 0)
    {
      return ret   
    }
    else
    {
      ret = good / countAll() * 100      
    }
    return ret
  }

  const countAverage = () => {
    let ret = 0
    if (countAll() === 0)
    {
      return ret      
    }
    else
    {
      ret = (good - bad) / countAll()   
    }

    return ret
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {countAll()}</p>
      <p>Averege: {countAverage()}</p>
      <p>Positive: {countPositive()} %</p>
    </div>
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