const Numbers = ({persons}) => {

    if (persons.length === 0) {
        return (
            <div>There is no numbers added</div>
        )
    }

    return (
        <div>
            {persons.map((person, idx) => 
                <p key={idx}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default Numbers