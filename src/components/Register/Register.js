import React from 'react'
import './register.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: '',
       password: '',
       name: ''
    }
  }
  
  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  } 

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmitSignIn = () => {
    
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(res => res.json())
    .then(user => {
      // console.log(user)
      if (user) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }

  render() {
    return (
      <div className='signInDiv'>
        <h1>Register</h1>
  
        <div className='signInForm' onSubmit={this.onSubmitSignIn}>
          <label htmlFor ='username'>User Name</label>
          <input 
            type='text' 
            name='username' 
            id='username' 
            required
            onChange={this.onNameChange}
            />
          <br/>
          <label htmlFor ='email'>Email</label>
          <input 
            type='text' 
            name='email' 
            id='email' 
            required
            onChange={this.onEmailChange}
            />
          <br/>
          <label htmlFor ='pass'>Password</label>
          <input 
            type='password' 
            name='password' 
            id='pass' 
            required
            onChange={this.onPasswordChange}
            />
          
          <button onClick={this.onSubmitSignIn} type="submit">Submit</button>
        </div>
        
        <hr/>
      </div>
    )

  }
}

export default Register
