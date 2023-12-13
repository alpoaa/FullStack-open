import axios from 'axios'
const baseUrlData = 'http://localhost:3000/persons'

const getData = () => {
    const request = axios.get(baseUrlData)
    return request.then(response => response.data)
}

const createData = newObject => {
    const request = axios.post(baseUrlData, newObject)
    return request.then(response => response.data)
}

const updateData = (id, newObject) => {
    const request = axios.put(`${baseUrlData}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteData = (id) => {
    const request = axios.delete(`${baseUrlData}/${id}`)
    return request.then(response => response.data)
}

export default {getData, createData, updateData, deleteData}