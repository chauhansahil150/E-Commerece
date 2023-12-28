import React from 'react'

function SquareShimmer() {
  return (
    <div className="shimmer-container flex p-2 justify-between flex-wrap">
      {
        Array(10).fill("")
        .map((e,ind)=>(
          <div key={ind} className='w-72 h-72 mb-2 bg-gray-200'>
      
          </div>
        ))
      } 
    </div>
  )
}

export default SquareShimmer
