const AddPersonForm = ({formSubmit, nameValue, nameChange, numberValue, numberChange}) => {
    return (
        <div>
            <form onSubmit={formSubmit}>
                <div>
                    name: <input value={nameValue} onChange={nameChange}/>
                </div>
                <div>
                    number: <input value={numberValue} onChange={numberChange} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AddPersonForm