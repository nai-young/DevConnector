import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

const Login = () => {
  // The second param is the funcion to update the state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const handleFormData = e => {
    // Copy the content of formData (...) and replace the "name='email'" with e.target.value
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    console.log('Sucess')
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into your Account</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email" value={email}
            onChange={e => handleFormData(e)}
            required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => handleFormData(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to={'/register'}>Sign Up</Link>
      </p>
    </Fragment>
  )
}

export default Login