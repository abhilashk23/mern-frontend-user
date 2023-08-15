import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getRandomColor } from '../utils';
import '../Home/Home.css';
import Header2 from '../Header2/Header2';
import AddLinkIcon from '@mui/icons-material/AddLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkOffIcon from '@mui/icons-material/LinkOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Home({ user }) {
    const history = useHistory();
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
    const [instagram, setInsta] = useState(0);

    const mainLinks = user.links.filter((link) =>
        link.title.toLowerCase() === "instagram" || link.title.toLowerCase() === "twitter" || link.title.toLowerCase() === "facebook" || link.title.toLowerCase() === "linkedin" || link.title.toLowerCase() === "github" || link.title.toLowerCase() === 'youtube'
    );

    const handlePageLoad = () => {
        setBackgroundColor(getRandomColor());
    };

    const otherLinks = user.links.filter((link) =>
        link.title.toLowerCase() !== "instagram" && link.title.toLowerCase() !== "twitter" && link.title.toLowerCase() !== "facebook" && link.title.toLowerCase() !== "linkedin" && link.title.toLowerCase() !== "github" && link.title.toLowerCase() !== 'youtube'
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
                    {user.profileImage ? (<img src={`http://localhost:5000/uploads/${user.profileImage}`} className='rounded-full w-32 h-32' alt="Profile" />) : (<AccountCircleIcon sx={{fontSize: 50}} />)}
                    <h1 className='pt-2 font-bold text-lg'>{user.name}</h1>
                    <p className='font-semibold text-md' style={{ color: user.bgImage ? 'black' : backgroundColor }}>{user.username}</p>
                    <div className='my-2 flex flex-row gap-x-3'>
                        {mainLinks.map((link, index) => {
                            if (link.title.toLowerCase() === 'instagram') {
                                return <a href={link.url} target='_blank' ><InstagramIcon fontSize='medium' /></a>
                            }
                            if (link.title.toLowerCase() === 'github') {
                                return <a href={link.url} target='_blank' ><GitHubIcon fontSize='medium' /></a>
                            }
                            if (link.title.toLowerCase() === 'linkedin') {
                                return <a href={link.url} target='_blank' ><LinkedInIcon fontSize='medium' /></a>
                            }
                            if (link.title.toLowerCase() === 'facebook') {
                                return <a href={link.url} target='_blank' ><FacebookIcon fontSize='medium' /></a>
                            }
                            if (link.title.toLowerCase() === 'twitter') {
                                return <a href={link.url} target='_blank' ><TwitterIcon fontSize='medium' /></a>
                            }
                            if (link.title.toLowerCase() === 'youtube') {
                                return <a href={link.url} target='_blank' ><YouTubeIcon fontSize='medium' /></a>
                            }
                        })}
                    </div>

                    <div className='flex flex-row gap-x-3 w-full'>
                        <div className='mt-3 rounded-lg text-center p-2 w-full' style={{ color: backgroundColor, border: `3px ${backgroundColor} dotted` }}>
                            <a href="/addlinks" title="Add Link"><AddLinkIcon /> Add Link</a>
                        </div>
                        <div className='mt-3 rounded-lg text-center p-2 w-full' style={{ color: backgroundColor, border: `3px ${backgroundColor} dotted` }}>
                            <a href="/dellink" title="Add Link"><LinkOffIcon  /> Delete Link</a>
                        </div>
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