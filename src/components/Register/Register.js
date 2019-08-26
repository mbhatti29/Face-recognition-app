import React from 'react'
// import './register.css'

const Register = ({ onRouteChange }) => {
  return (
    <div className='signInDiv'>
      <h1>Register</h1>

      <div className='signInForm'>
        <label htmlFor ='username'>User Name</label>
        <input type='text' name='username' id='username' />
        <br/>
        <label htmlFor ='password'>Password</label>
        <input type='text' name='password' id='password' />
        <button onClick={() => onRouteChange('home')}>Submit</button>
      </div>
      <hr/>
    </div>
  )
}

export default Register
