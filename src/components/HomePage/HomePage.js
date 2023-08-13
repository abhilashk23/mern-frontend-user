import React from 'react'
import dummy from '../../images/dummy.png';

function HomePage() {
  return (
    <div className='m-5 p-5 flex flex-row justify-between items-center'>
      <div className='w-5/12 flex flex-col'>
        <h1 className='text-7xl font-bold'>All links, one place</h1>
        <p className='py-3 text-lg'>
          A single place to store all your important links and you would never forget them. Register now
          to store links from YoTube, Instagram, Tiktok and other social media profiles.
        </p>
      </div>
      <div className='w-2/5'>
        <img src={dummy} />
      </div>
    </div>

  )
}

export default HomePage