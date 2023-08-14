import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getRandomColor } from '../utils';
import '../Home/Home.css';
import Header2 from '../Header2/Header2';


function Home({ user }) {
    const history = useHistory();
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    const handlePageLoad = () => {
        setBackgroundColor(getRandomColor());
    };

    return (
        <div className='flex flex-col' style={{ backgroundColor: backgroundColor, minHeight: "100vh" }}>
            <div className='p-3 flex justify-center items-center'>
                <Header2 user={user} />
            </div>
            <br />
            <br />
            <div className='home'>
                <div className='w-2/5 rounded-lg bg-white p-5 flex flex-col justify-items-center items-center'>
                    {user.profileImage ? (<img src={`http://localhost:5000/uploads/${user.profileImage}`} className='rounded-full w-32 h-32' alt="Profile" />) : (<p>NULL</p>)}
                    <h1 className='pt-2 font-bold text-lg'>{user.name}</h1>
                    <p className='font-semibold text-md' style={{ color: backgroundColor }}>{user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Home