import './login.css'
import Services from '../../api/apiCalls'
import { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { Alert, Button } from 'react-bootstrap'
import AddProduct from '../addProduct/addProduct'
const authService = new Services()
let logOutVis = 'hidden'
const length = Number(process.env.REACT_APP_SESSION)

const Login = () => {
  //login states
  const [showMessage, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);

  //show logout button on refresh if logged in
  useEffect(() => {
    let user = sessionStorage.getItem('userEmail')
    if (user !== null) {
      logOutVis = 'Visible'
    }
  })

  //Set logged in status
  useEffect(() => {
    let sessionID = sessionStorage.getItem('session')
    if (sessionID) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

  }, [])

  //login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.form[1].value
    try {
      //send login request
      const response = await authService.authUser({
        username: e.target.form[0].value,
        password: password,
      })
      //check session id
      if (response.session.length === length) {
        //show messages
        setMessage(true)
        setErrorMessage(false)
        //store user
        sessionStorage.setItem('session', response.session)
        //clear form
        e.target.form[0].value = ''
        e.target.form[1].value = ''
        //set state
        setLoggedIn(true)
      }
    } catch (err) {
      setMessage(false)
      setErrorMessage(true)
    }
  }
  const handleLogOut = () => {
    sessionStorage.setItem('session', '')
    window.location.reload()
  }

  //If the user is not logged in show the login form
  if (!loggedIn) {
    return (
      <div>
        <Alert key='danger'
          variant='danger'
          show={errorMessage}
          onClose={() => setErrorMessage(false)}
          dismissible>
          Incorrect Login, Please Try Again
        </Alert>
        <form className="formBlock">
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
          </div>
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>

      </div>

    )
    //User is logged in call the add product component
  } else {
    return (
      <div >
        <Alert key="success" variant="success" show={showMessage}>
          <Alert.Heading>Welcome</Alert.Heading>
          <p>Please Use The Form Below To Add or Update Products</p>
        </Alert>

        <AddProduct />
        <div className='formBlock'>
        <button
          type="button"
          id="btn"
          className="btn btn-primary"
          onClick={handleLogOut}
        >
          Log Out
        </button>
        </div>
      </div>
    )
  }
}

export default Login
