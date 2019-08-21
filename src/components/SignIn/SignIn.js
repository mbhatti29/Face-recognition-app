import React from 'react'
import './signIn.css'

const SignIn = ({ login }) => {
  return (
    <div className='signInDiv'>
      <h1>SignIn Form</h1>

      <form className='signInForm' onSubmit={login}>
        <label htmlFor ='username'>User Name</label>
        <input type='text' name='username' id='username' />
        <br/>
        <label htmlFor ='password'>Password</label>
        <input type='text' name='password' id='password' />
        <button onSubmit={() => login('home')}>Submit</button>
        <p className='register'>Register</p>
      </form>
      <hr/>
    </div>
  )
}

export default SignIn
