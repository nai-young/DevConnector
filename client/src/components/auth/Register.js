import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = ({ setAlert }) => {
  // The second param is the funcion to update the state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  const handleFormData = e => {
    // Copy the content of formData (...) and replace the "name='email'" with e.target.value
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      // Pass the message to the alert.js action
      // Then it will generate an id and dispatch SET_ALERT with an alert type
      setAlert('Passwords do not match', 'danger')
    } else {
      /* const newUser = {
        name,
        email,
        password
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser)
        const res = await axios.post('/api/users', body, config)
        console.log(res.data)
      } catch (err) {
        console.error(err.response.data)
      } */

      console.log('Sucess')
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => handleFormData(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => handleFormData(e)} required/>
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => handleFormData(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to={'/login'}>Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

// eslint-disable-next-line no-lone-blocks
{/*
  An object with any action you want to do
  Allow us to access to props.setAlert in (props)
*/}

export default connect(null, { setAlert })(Register)
