import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

import '../styles/togglable.css'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  if (!props.show) {
    return null
  }

  return (
    <div className="togglablemain">
      {!visible && <div className='create'>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>}
      {visible && <div className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable