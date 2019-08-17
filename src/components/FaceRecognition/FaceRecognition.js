import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ image, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2 imageBox'>
        <img id='inputImage' src = { image } alt=""/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition
