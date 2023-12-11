const Numbers = ({numbers}) => {

    if (numbers.length === 0) {
        return (
            <div>There is no numbers added</div>
        )
    }

    return (
        <div>
            {numbers.map((number, idx) => 
                <p key={idx}>{number.name}</p>
            )}
        </div>
    )
}

export default Numbers