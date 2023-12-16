const Country = ({country}) => {

    if (country === null) {
        return null
    }
    
    return (
        <div>
            <p>{country.name.common}</p>
        </div>
    )
}

export default Country