/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
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

export default Togglable