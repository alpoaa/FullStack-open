import { useDispatch } from "react-redux"
import { anecdoteCreate } from "../reducers/anecdoteReducer"

const CreateAnecdote = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const newAnecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(anecdoteCreate(newAnecdote))
    }

    return (
        <form onSubmit={create}>
            <h5>Create new anecdote</h5>
            <input name="anecdote" placeholder="new anecdote"/>
            <button type="submit">create</button>
        </form>
    )
}

export default CreateAnecdote