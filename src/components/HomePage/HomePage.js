import React from 'react'
import dummy from '../../images/dummy.png';
import Header from '../Header/Header';

function HomePage() {
  return (
    <div>
      <div className='bg-fuchsia-500'>
        <div className='p-5'>
          <Header />
        </div>
        <div className='text-white flex flex-row justify-between items-center'>
          <div className='w-6/12 flex flex-col m-3 p-5'>
            <h1 className='text-7xl font-bold'>All links, one place.</h1>
            <p className='py-3 text-xl'>
              A single place to store all your important links and you would never forget them. Register now
              to store links from YoTube, Instagram, Tiktok and other social media profiles.
            </p>
          </div>
          <div className='w-7/12 m-3 p-5'>
            <img src={dummy} />
          </div>
        </div>
      </div>
      <div className='bg-rose-400 flex flex-row justify-between items-center'>
        <div className='w-5/12 m-6 p-5 '>
          <img src={dummy} />
        </div>
        <div className='w-6/12 flex flex-col m-6 p-5 '>
          <h1 className='text-7xl font-bold'>Create and customize your page, however you like</h1>
          <p className='py-3 text-xl'>
            Connect all your social media profiles like Twitter, Instagram, TikTok and many more important
            links and customizeyour page with the image you like.
          </p>
        </div>
      </div>
    </div>

  )
}

export default HomePage