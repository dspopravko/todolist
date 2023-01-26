import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '4f75b79d-af09-4141-9f0e-f229ac4ac21f',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
})
