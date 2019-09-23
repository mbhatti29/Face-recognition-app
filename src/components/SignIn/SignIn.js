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
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }

  register = () => {
     this.props.onRouteChange('register')
  }
  
  render() {

    return (  
      <div className='signInDiv'>
        <h1>SignIn Form</h1>

        <div className='signInForm' onSubmit={this.onSubmitSignIn}>
          <label htmlFor ='email'>User Name</label>
          <input onChange={this.onEmailChange} type='text' name='email' id='email' autoComplete="on" required/>
          <br/>
          <label htmlFor ='password'>Password</label>
          <input onChange={this.onPasswordChange} type='password' name='password' id='password' autoComplete="on" required/>
          <button onClick={this.onSubmitSignIn}>Submit</button>
        </div>
          <p onClick={this.register} className='register'>Register</p>
        <hr/>
      </div>
        
    )
  }

}

export default SignIn
