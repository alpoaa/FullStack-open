/* eslint-disable no-unused-vars */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getBlog = async(blogId) => {
    const response = await axios.get(`${baseUrl}/${blogId}`)
    return response.data
}

const createBlog = async newBlogObj => {
    const authConfig = {
        headers: {Authorization: token},
    }

    const response = await axios.post(baseUrl, newBlogObj, authConfig)
    return response.data
}

const updateBlog = async(updatedBlogObj, blogId) => {
    const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlogObj)
    return response.data
}

export default { setToken, getAll, getBlog, createBlog, updateBlog }