import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ image }) => {
  return (
    <div>
      <div className='imageBox'>
        <img src = { image } alt='detected upload'/>
        <div className='dot'></div>
      </div>
    </div>
  )
}

export default FaceRecognition
