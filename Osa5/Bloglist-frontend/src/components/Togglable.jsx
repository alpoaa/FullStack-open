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

  return (
    <div className="togglablemain">
      {!visible && <div>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>}
      {visible && <div>
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