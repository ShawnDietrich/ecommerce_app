import axios from 'axios'
let baseUrl = ''
axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

if (process.env.NODE_ENV === 'production'){
   baseUrl = 'https://ecommerce.made-to-order.ca'
   //baseUrl = 'http://localhost:3001'

}else {
   baseUrl = 'http://localhost:3001'
}

export default class Services {
  getAllProducts() {
    const response = axios.get(baseUrl + '/inventory')
    return response.then((response) => response.data)
  }

  addProduct(data) {
    try {
      const response = axios.post(baseUrl + '/inventory', data)
      return response.then((response) => response.data)
    } catch (err) {
      
      throw err
    }
  }

  updateProduct(data){
    try{
      //console.log(data)
      const response = axios.put(baseUrl + '/inventory', data)
      return response.then((response) => response.data)
    }catch (err){
      throw err
    }
  }

  deleteProduct(data){
    const response = axios.delete(baseUrl + '/inventory', {data: data})
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

  checkLogStatus() {
    const response = axios.get(baseUrl + '/auth/status')
    return response.then((response) => response.data)
  }

  logout(sessionID) {
    const response = axios.delete(baseUrl + '/auth/logout', {data: {UserToken: sessionID}})
    return response.then((response) => response.data)
  }
}
