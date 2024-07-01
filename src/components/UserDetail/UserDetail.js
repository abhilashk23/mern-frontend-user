import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function UserDetail() {
    const { username } = useParams();
    // const [result, setUser] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post('https://user-login-api.onrender.com/users/searchUser', { username: username });
                setResult(response.data);
                setError(null);
            } catch (e) {
                setResult(null);
                setError({ message: 'No such result found!! Please check the spelling' });
            }
        };

        fetchUser();
    }, [username]);

    let mainLinks = null;
    let otherLinks = null;

    if (result !== null) {
        mainLinks = result.links.filter((link) =>
            ['instagram', 'twitter', 'facebook', 'linkedin', 'github', 'youtube'].includes(link.title.toLowerCase())
        );

        otherLinks = result.links.filter((link) =>
            !['instagram', 'twitter', 'facebook', 'linkedin', 'github', 'youtube'].includes(link.title.toLowerCase())
        );
    }


    if (!result) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center w-full' style={{
            backgroundColor: result.bgImage ? 'transparent' : 'black',  // fix later
            backgroundImage: result.bgImage ? `url(${result.bgImage})` : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: "100vh"
        }}>
            <div className='flex flex-col justify-items-center items-center mb-5'>
                <div className='w-11/12 2xl:w-full rounded-lg bg-white p-5 flex flex-col justify-items-center items-center'>
                    {result.profileImage ? (<img src={`${result.profileImage}`} className='rounded-full w-32 h-32' alt="Profile" />) : (<AccountCircleIcon sx={{ fontSize: 50 }} />)}
                    <h1 className='pt-2 font-bold text-lg'>{result.name}</h1>
                    {/* fix later */}
                    <p className='font-semibold text-md' style={{ color: result.bgImage ? 'black' : 'black' }}>@{result.username}</p>
                    <div className='my-2 flex flex-row gap-x-3'>
                        {mainLinks.map((link, index) => {
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'instagram') {
                                return <a href={link.url} target='_blank' ><InstagramIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'github') {
                                return <a href={link.url} target='_blank' ><GitHubIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'linkedin') {
                                return <a href={link.url} target='_blank' ><LinkedInIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'facebook') {
                                return <a href={link.url} target='_blank' ><FacebookIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'twitter') {
                                return <a href={link.url} target='_blank' ><TwitterIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                            {/* fix later */}
                            if (link.title.toLowerCase() === 'youtube') {
                                return <a href={link.url} target='_blank' ><YouTubeIcon fontSize='medium' sx={{ color: 'black' }} /></a>
                            }
                        })}
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
    );
}

const getIconComponent = (title) => {
    switch (title) {
        case 'instagram':
            return InstagramIcon;
        case 'github':
            return GitHubIcon;
        case 'linkedin':
            return LinkedInIcon;
        case 'facebook':
            return FacebookIcon;
        case 'twitter':
            return TwitterIcon;
        case 'youtube':
            return YouTubeIcon;
        default:
            return null;
    }
};

export default UserDetail;
