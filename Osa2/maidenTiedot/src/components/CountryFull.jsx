import '../styles/countryFull.css'

const CountryFull = ({country}) => {
    const languages = Object.values(country.languages)

    return (
        <div className="main">
            <h3>{country.name.common}</h3>
            <p> {`Capital: ${country.capital[0]}`}</p>
            <p> {`Area: ${country.area}m2`}</p>
            <p>Languages:</p>
            {languages
                .map((language, idx) => <li key={idx}>{language}</li>)
            }
            <div className="image">
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </div>
    )
}

export default CountryFull