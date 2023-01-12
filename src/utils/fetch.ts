import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetch = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default fetch
