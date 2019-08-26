import React from 'react'
import './signIn.css'

const SignIn = ({ onRouteChange }) => {
  return (
    <div className='signInDiv'>
      <h1>SignIn Form</h1>

      <div className='signInForm' onSubmit={onRouteChange}>
        <label htmlFor ='username'>User Name</label>
        <input type='text' name='username' id='username' />
        <br/>
        <label htmlFor ='password'>Password</label>
        <input type='text' name='password' id='password' />
        <button onClick={ () => onRouteChange('home') }>Submit</button>
        <p onClick={ () => onRouteChange('register') } className='register'>Register</p>
      </div>
      <hr/>
    </div>
  )
}

export default SignIn
