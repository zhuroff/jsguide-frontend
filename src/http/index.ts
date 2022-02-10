import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: process.env['REACT_APP_SERVER_HOST']
})

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default api
