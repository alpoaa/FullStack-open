import axios from 'axios'
const baseUrlApi = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getData = () => {
    const request = axios.get(baseUrlApi)
    return request.then(response => response.data)
}

export default {getData}