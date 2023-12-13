const Numbers = ({persons, filterValue, handleDeleteClick}) => {

    if (persons.length === 0) {
        return (
            <div>There is no numbers added</div>
        )
    }

    return (
        <div>
            {persons
                .filter(person => 
                    person.name.toLowerCase().includes(filterValue.toLowerCase()))
                .map((person) => 
                    <div key={person.id}>
                        {person.name} {person.number} <button onClick={() => handleDeleteClick(person.id)}>Delete</button>
                    </div>
            )}
        </div>
    )
}

export default Numbers