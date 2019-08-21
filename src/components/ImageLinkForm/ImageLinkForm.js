import React from 'react'
import './imageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>

      <p className='f3 center' style={{textAlign: 'center'}}>
        {'This Magic Logo will detect faces in your pictures. Be Afraid!'}
      </p>
      
      <div className='center'>
        <div className='form pa4 br3'>
        <form>
          <input className='searchInput f4 pa2 w-70 shadow-5' type='text' onChange={onInputChange}/>
          <button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple shadow-3' onClick={onButtonSubmit}>Detect</button>
        </form>
        </div>
      </div>

    </div>
  )
}

export default ImageLinkForm
