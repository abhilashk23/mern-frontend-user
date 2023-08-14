import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getRandomColor } from '../utils';
import '../Home/Home.css';
import Header2 from '../Header2/Header2';


function Home({ user }) {
    const history = useHistory();
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    const mainLinks = user.links.filter((link) =>
        link.title.toLowerCase() === "instagram" || link.title.toLowerCase() === "twitter" || link.title.toLowerCase() === "facebook" || link.title.toLowerCase() === "linkedin" || link.title.toLowerCase() === "github" || link.title.toLowerCase() === "snapchat"
    );

    const handlePageLoad = () => {
        setBackgroundColor(getRandomColor());
    };

    const otherLinks = user.links.filter((link) =>
        link.title.toLowerCase() !== "instagram" && link.title.toLowerCase() !== "twitter" && link.title.toLowerCase() !== "facebook" && link.title.toLowerCase() !== "linkedin" && link.title.toLowerCase() !== "github" && link.title.toLowerCase() !== "snapchat"
    );

    


    return (
        <div className='flex flex-col' style={{
            backgroundColor: user.bgImage ? 'transparent' : backgroundColor,
            backgroundImage: user.bgImage ? `url(http://localhost:5000/uploads/${user.bgImage})` : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: "100vh"
        }}>
            <div className='p-3 flex justify-center items-center'>
                <Header2 user={user} />
            </div>
            <br />
            <br />
            <div className='home mb-5'>
                <div className='w-2/5 rounded-lg bg-white p-5 flex flex-col justify-items-center items-center'>
                    {user.profileImage ? (<img src={`http://localhost:5000/uploads/${user.profileImage}`} className='rounded-full w-32 h-32' alt="Profile" />) : (<p>NULL</p>)}
                    <h1 className='pt-2 font-bold text-lg'>{user.name}</h1>
                    <p className='font-semibold text-md' style={{ color: user.bgImage ? 'black' : backgroundColor }}>{user.username}</p>
                    <div className='flex flex-row gap-x-4'>
                        {mainLinks.map((link, index) => (
                            <a href={link.url} target="_blank">
                                {link.title}
                            </a>
                        ))}
                    </div>

                    <div className='mt-3 flex flex-col w-full gap-y-3'>
                        {otherLinks.map((link, index) => (
                            <div className='bg-biege-500 border-2 border-black rounded-lg text-center p-2 w-full'>
                                <a href={link.url} target="_blank">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home