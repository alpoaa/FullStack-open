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
        <div>
            <h4>Create new anecdote</h4>
            <form onSubmit={create}>
                <input name="anecdote" placeholder="new anecdote"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateAnecdote