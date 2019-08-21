import React from 'react'
import './navigation.css'

const Navigation = ({ route, signOut }) => {
  return (
    <div>
      <nav style={{display: 'flex', justifyContent: 'flex-end', height: '10px'}}>
        { route === 'signIn'

         ? <div className='link'><p className='f3 link dim black underline pa3 pointer'>Sign In</p></div>
         : <div className='link'>
            
            <p className='f3 link dim black underline pa3 pointer'
                onClick={ signOut }>Sign Out</p>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navigation;