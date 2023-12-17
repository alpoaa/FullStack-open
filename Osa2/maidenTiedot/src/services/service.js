import axios from 'axios'
const baseUrlApi = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseWeatherUrlApi = 'https://api.open-meteo.com/v1/forecast?'

const getData = () => {
    const request = axios.get(baseUrlApi)
    return request.then(response => response.data)
}

const getWeatherData = (latitude, longitude) => {
    const request = axios.get(`${baseWeatherUrlApi}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&forecast_days=1`)
    return request.then(response => {return response.data.current})
}

export default {getData, getWeatherData}