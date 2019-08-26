import React from 'react'
import './navigation.css'

const Navigation = ({ route, onRouteChange }) => {

  if (route === 'signIn') {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', height: '10px'}}>
        <div className='link'>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </div>
      </nav>
    )
  } else if (route === 'register') {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', height: '10px'}}>      
        <div className='link'>
          <p className='f3 link dim black underline pa3 pointer'
             onClick={() => onRouteChange('signIn') }>Sign In</p>
        </div>
      </nav>
    )
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', height: '10px'}}>      
        <div className='link'>
          <p className='f3 link dim black underline pa3 pointer'>Home</p>
          <p className='f3 link dim black underline pa3 pointer'
             onClick={() => onRouteChange('signIn') }>Sign Out</p>
        </div>
      </nav>
    )
  }
}

export default Navigation;