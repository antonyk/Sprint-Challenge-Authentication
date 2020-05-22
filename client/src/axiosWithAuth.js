import axios from 'axios'

const url = 'https://localhost:5000'

export default function axiosWithAuth() {
  const token = JSON.parse(localStorage.getItem('token'))
  // const token = localStorage.getItem('token')
  
  return axios.create({
    headers: {
      Authorization: token,

    },
    baseURL: url,
  })

}