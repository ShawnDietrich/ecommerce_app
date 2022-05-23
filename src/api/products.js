import axios from 'axios'


axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

const baseUrl = 'http://localhost:3001/products'

export default class ProductServices {
  getAllProducts () {
    const response = axios.get(baseUrl)
    return response.then((response) => response.data)
  }
}
