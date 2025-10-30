import axios from "axios"

// export const API_URL = "http://localhost:8000/api/v1"
export const API_URL = "https://favflix.onrender.com/api/v1"

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})