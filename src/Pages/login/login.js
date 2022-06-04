import './login.css'
import Services from '../../api/apiCalls'
import { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs/dist/bcrypt'
import { Alert, Button } from 'react-bootstrap'
const authService = new Services()
let logOutVis = 'hidden'
const salt = process.env.REACT_APP_SALT

const Login = () => {
  //login states
  const [showMessage, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  //show logout button on refresh if logged in
  useEffect(() => {
    let user = sessionStorage.getItem('userEmail')
    if (user !== null) {
      logOutVis = 'Visible'
    }
  })

  //login user
  const handleSubmit = async (e) => {
    
    const response = await authService.authUser({
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    })

    if (response.password === passwordHash) {
      //show messages
      setMessage(true)
      setErrorMessage(false)
      //store user
      sessionStorage.setItem('userEmail', response.email)
      //clear form
      e.target.form[0].value = ''
      e.target.form[1].value = ''
      //reload page
      //window.location.reload()
    } else {
      setMessage(false)
      setErrorMessage(true)
    }
  }
  const handleLogOut = () => {
    sessionStorage.clear()
    window.location.reload()
  }
  return (
    <div className="formBlock">
      <Alert key="success" variant="success" show={showMessage}>
        <Alert.Heading>
          Welcome {sessionStorage.getItem('userEmail')}
        </Alert.Heading>
        <Button onClick={() => setMessage(false)} variant="outline-success">
          Ok
        </Button>
      </Alert>
      <form>
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
          {/*
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
  
          </div>
          */}
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
        {/*
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
  */}
      </form>

      <button
        type="button"
        id="btn"
        className="btn btn-primary"
        onClick={handleLogOut}
        style={{ visibility: logOutVis }}
      >
        Log Out
      </button>
    </div>
  )
}

export default Login
