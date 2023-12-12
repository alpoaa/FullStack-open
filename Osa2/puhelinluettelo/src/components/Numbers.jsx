const Numbers = ({persons, filterValue}) => {

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
                .map((person, idx) => 
                    <p key={idx}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default Numbers