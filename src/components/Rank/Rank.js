import React from 'react'

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='black f3 center'>
        {`${ name } , your current rank:`}
      </div>
      <div className='white f2 center'>
        { entries }
      </div>
    </div>
  )
}

export default Rank
