import service from '../services/service'
import '../styles/countryFull.css'

const CountryFull = ({country}) => {
    const languages = Object.values(country.languages)
    const location = country.capitalInfo.latlng
    const weatherData = []
    const populateData = (data) => weatherData.push(data)

    const handleWeatherSearch = () => {
        service
            .getWeatherData(location[0], location[1])
            .then(response => {
                populateData(response)
            })
    }

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
            <button onClick={handleWeatherSearch}>Find weather</button>
            <h5>{`Weather in ${country.capital[0]}`}</h5>
            <div>
                <p>{weatherData[0]}</p>
            </div>
        </div>
    )
}

export default CountryFull