import axios from 'axios'

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

//const baseUrl = 'http://localhost:3001'
const baseUrl = ''

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
      //console.log(data)
      const response = axios.put(baseUrl + '/products', data)
      return response.then((response) => response.data)
    }catch (err){
      throw err
    }
  }

  deleteProduct(data){
    const response = axios.delete(baseUrl + '/products', {data: data})
    return response.then((response) => response.data)
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
    const response = axios.delete(baseUrl + '/auth/logout', {data: {UserToken: sessionID}})
    return response.then((response) => response.data)
  }
}
