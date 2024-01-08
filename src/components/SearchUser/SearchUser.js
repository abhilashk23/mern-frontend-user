import React, { useState } from 'react'
import axios from 'axios'
// import AddLinkIcon from '@mui/icons-material/AddLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
// import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

function SearchUser() {

    const [searchuser, setSearchUser] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://user-login-api.onrender.com/users/searchUser', { username: searchuser })
                .then((response) => {
                    setResult(response.data);
                    setError(null);
                })
                .catch((e) => {
                    setResult(null);
                    setError({ message: 'No such user found!! Please check the spelling' });
                });
        }
        catch (error) {
            // console.log(error);
        }
    }

    const clearSearch = () => {
        setSearchUser('');
        setResult(null);
    }

    let mainLinks = null;
    let otherLinks = null;

    if (result !== null) {
        mainLinks = result.links.filter((link) =>
            link.title.toLowerCase() === "instagram" || link.title.toLowerCase() === "twitter" || link.title.toLowerCase() === "facebook" || link.title.toLowerCase() === "linkedin" || link.title.toLowerCase() === "github" || link.title.toLowerCase() === 'youtube'
        );

        otherLinks = result.links.filter((link) =>
            link.title.toLowerCase() !== "instagram" && link.title.toLowerCase() !== "twitter" && link.title.toLowerCase() !== "facebook" && link.title.toLowerCase() !== "linkedin" && link.title.toLowerCase() !== "github" && link.title.toLowerCase() !== 'youtube'
        );
    }

    return (
        <div className='p-5'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row gap-x-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary-600 focus:border-primary-600 w-full p-2.5'>
                    <button type='submit'><SearchIcon /> </button>
                    <input type='text' className='w-full bg-gray-50 focus:outline-none' placeholder='Enter exact user to search' value={searchuser} onChange={(e) => setSearchUser(e.target.value)} required />
                    <button type='reset' onClick={clearSearch}><CloseIcon /> </button>
                </div>
            </form>

            {result !== null ? (
                <div>
                    <div className='mt-5 flex flex-col 2xl:flex-row gap-x-5 items-center justify-items-center'>
                        {result.profileImage ? (<img src={`${result.profileImage}`} className='rounded-full w-28 h-28' alt="Profile" />) : (<AccountCircleIcon sx={{ fontSize: 50 }} />)}
                        <div>
                            <h1 className='pt-2 font-bold text-lg'>{result.name}</h1>
                            <p className='font-semibold text-md text-center 2xl:text-left' style={{ color: 'black' }}>@{result.username}</p>
                            <div className='my-2 flex flex-row justify-center 2xl:justify-start gap-x-3'>
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
                        </div>

                    </div>
                    <div className='mt-3 flex flex-col justify-center w-full gap-y-3'>
                        {otherLinks.map((link, index) => (
                            <div className='bg-biege-500 border-2 border-black rounded-lg text-center p-2 w-full'>
                                <a href={link.url} target="_blank">
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )
                :
                error ? (<p className='my-4'>{error.message}</p>) : (
                    <div className='mt-5 flex flex-row gap-x-5 items-center justify-items-center'>
                        <Stack spacing={1}>
                            <div className='flex flex-row justify-items-center items-center gap-x-5'>
                                <Skeleton variant="circular" width={100} height={100} />
                                <div className='flex flex-col'>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
                                    <div className='my-2 flex flex-row gap-x-3'>
                                        <Skeleton variant="rounded" width={30} height={30} />
                                        <Skeleton variant="rounded" width={30} height={30} />
                                        <Skeleton variant="rounded" width={30} height={30} />
                                        <Skeleton variant="rounded" width={30} height={30} />
                                        <Skeleton variant="rounded" width={30} height={30} />
                                    </div>
                                </div>
                            </div>
                            <Skeleton variant="rounded" width={500} height={30} />
                            <Skeleton variant="rounded" width={500} height={30} />
                        </Stack>
                    </div>
                )}

        </div>
    )
}

export default SearchUser