import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer/reducer'

const store = createStore(reducer)

const App = () => {
  const setGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const setOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const setBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={setGood}>good</button> 
      <button onClick={setOk}>ok</button> 
      <button onClick={setBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getStat().bad}</div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
