import axios from 'axios'

const token = '18a1df1e'

const apiRequest = axios.create({
    baseURL: `https://api.github.com`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
    }
})

export default apiRequest
