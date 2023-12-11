const AddPersonForm = ({formSubmit, inputValue, inputChange}) => {
    return (
        <div>
            <form onSubmit={formSubmit}>
                name: <input value={inputValue} onChange={inputChange}/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AddPersonForm