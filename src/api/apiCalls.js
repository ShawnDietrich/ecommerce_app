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
    try {
      const response = axios.post(baseUrl + '/products', data)
      return response.then((response) => response.data)
    } catch (err) {
      
      throw err
    }

  }

  updateProduct(data){
    try{
      const response = axios.put(baseUrl + '/products', data)
      return response.then((response) => response.data)
    }catch (err){
      throw err
    }
  }


  authUser(data) {
    //console.log(data)
    const response = axios.post(baseUrl + '/auth/login',
      {
        username: data.username,
        password: data.password
      }
    )

    return response.then((response) => response.data)
  }

  logout(sessionID) {
    const response = axios.post(baseUrl + '/auth/logout', {sessionID})
    return response.then((response) => response.data)
  }
}
