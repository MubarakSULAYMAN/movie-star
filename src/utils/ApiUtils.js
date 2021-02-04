import axios from 'axios'

const apiRequest = axios.create({
    baseURL: `http://www.omdbapi.com`,
    withCredentials: false,
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `token ${token}`
    }
})

export default apiRequest
