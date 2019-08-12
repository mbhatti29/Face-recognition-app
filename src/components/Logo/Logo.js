import React from 'react';
import Tilt from 'react-tilt'
import logo from '../../icon3.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='logo mt0'>
      <Tilt className="Tilt br1" options={{ max : 45 }} style={{ height: 180, width: 180 }} >
        <div className="Tilt-inner pa4">
          <img style={{ paddingBottom: '20px'}} src={logo} alt='logo'/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
