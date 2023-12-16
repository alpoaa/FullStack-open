import Country from './Country'
import CountryFull from './CountryFull'

const Countries = ({countries, filterValue}) => {
    const filteredCountries = countries
                .filter(country => 
                    country.name.common.toLowerCase().includes(filterValue.toLowerCase())
    )
    
    if (filteredCountries.length === 0) {
        return null
    }
    else if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify more accurate filter</p>
            </div>
        )
    }
    else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries
                    .map((country, idx) => 
                        <Country key={idx} country={country} />
                )}
            </div>
        )
    }
    
    return (
        <div>
            {filteredCountries
                .map((country, idx) => 
                    <CountryFull key={idx} country={country} />
            )}
        </div>
    )
}

export default Countries