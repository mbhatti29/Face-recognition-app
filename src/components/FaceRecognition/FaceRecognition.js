import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ image, box }) => {
  console.log(box)
  return (
    <div>
      <div className='imageBox'>
        <img id='inputImage' src = { image } alt=""/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition
