import './login.css'
import Services from '../../api/apiCalls'
import { useEffect } from 'react'
const authService = new Services()

let logOutVis = "hidden"
const Login = () => {
    useEffect (()=> {
        let user = sessionStorage.getItem("userEmail")
        if (user !== null) {
            logOutVis = "Visible";
        }
    })
  const handleSubmit = async (e) => {
    const response = await authService.authUser({
      username: e.target.form[0].value,
      password: e.target.form[1].value,
    })
    if (response.id !== 0) {
      sessionStorage.setItem('userEmail', response.email)
    }
    e.target.form[0].value = ''
    e.target.form[1].value = ''
    window.location.reload()
  }
  const handleLogOut = () => {
    sessionStorage.clear()
    window.location.reload()
  }
  return (
    <div className="formBlock">
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
      
      <button type="button" id='btn' className="btn btn-primary" onClick={handleLogOut} style={{visibility: logOutVis}}>
        Log Out
      </button>
    </div>
  )
}

export default Login
