import axios from 'axios'

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

const baseUrl = 'http://localhost:3001'

export default class Services {
  getAllProducts() {
    const response = axios.get(baseUrl + '/products')
    return response.then((response) => response.data)
  }

  addProduct(data) {
    console.log(data)
    const response = axios.post(baseUrl + '/products', data)
    return response.then((response) => response.data)
  }

  authUser(data) {
    //console.log(data)
    const response = axios.post(baseUrl + '/auth/login', data)
    return response.then((response) => response.data)
  }
}
