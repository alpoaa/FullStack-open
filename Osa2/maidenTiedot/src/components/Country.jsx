import { useEffect, useState } from 'react'
import CountryFull from './CountryFull'

const Country = ({country}) => {
    const [show, setShow] = useState(false)

    const setVisibility = () => {
        setShow(!show)
    }

    if (country === null) {
        return null
    }
    
    return (
        <div>
            {country.name.common} <button onClick={setVisibility}>{show ? 'hide' : 'show'}</button>
            {show ? <CountryFull country={country} /> : <div/>}
        </div>
    )
}

export default Country