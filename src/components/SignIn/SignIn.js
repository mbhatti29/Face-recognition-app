import React from 'react'
import './signIn.css'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       signInEmail: '',
       signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value
    })
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data === 'success') {
        this.props.onRouteChange('home')
      }
    })
  }

  render() {
    const onRouteChange = this.props

    return (  
      <div className='signInDiv'>
        <h1>SignIn Form</h1>

        <div className='signInForm' onSubmit={this.onSubmitSignIn}>
          <label htmlFor ='email'>User Name</label>
          <input onChange={this.onEmailChange} type='text' name='email' id='email' />
          <br/>
          <label htmlFor ='password'>Password</label>
          <input onChange={this.onPasswordChange} type='password' name='password' id='password' />
          <button onClick={this.onSubmitSignIn}>Submit</button>
        </div>
          <p onClick={ () => onRouteChange('register') } className='register'>Register</p>
        <hr/>
      </div>
        
    )
  }

}

export default SignIn
