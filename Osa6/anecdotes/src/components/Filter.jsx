/* eslint-disable no-unused-vars */
import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = (props) => {

    const dispatch = useDispatch()

    const filterAnecdotes = (event) => dispatch(filterChange(event.target.value))
     
    return (
        <div>
            <p>Filter anecdotes:</p>
            <input name="anecdoteFilter" placeholder="Set filter" onChange={filterAnecdotes}/>
        </div>
    )
}

export default Filter