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
      return err
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


  /*
  async authUser(data) {

    const credentials = btoa(data.username + " : " + data.password)
    const authHeader = { "Authorization": `Basic ${credentials}` }

    const response = await fetch(baseUrl + '/auth/login', {
      method: 'POST',
      headers: new Headers({
        "Authorization": `Basic ${btoa(`${data.username}:${data.password}`)}`
      })
    })
  }
  */
}
