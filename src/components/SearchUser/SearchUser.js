import React, { useState } from 'react'
import axios from 'axios'
import AddLinkIcon from '@mui/icons-material/AddLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function SearchUser() {

    const [searchuser, setSearchUser] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users/searchUser', { username: searchuser })
                .then((response) => {
                    setResult(response.data);
                })
                .catch((e) => {
                    setResult(null);
                });
        }
        catch (error) {
            console.log(error);
        }
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
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter exact user to search' value={searchuser} onChange={(e) => setSearchUser(e.target.value)} required />
                <button type='submit'>Search</button>
            </form>
            <a href="/home/:username"><HomeIcon /> Return home</a>
            {result !== null ? (
                <div>
                    {result.profileImage ? (<img src={`http://localhost:5000/uploads/${result.profileImage}`} className='rounded-full w-32 h-32' alt="Profile" />) : (<AccountCircleIcon sx={{ fontSize: 50 }} />)}
                    <h1 className='pt-2 font-bold text-lg'>{result.name}</h1>
                    <p className='font-semibold text-md' style={{ color: 'black' }}>@{result.username}</p>
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
            )
                :
                (<p>No user found with that username! Try Again!</p>)}
        </div>
    )
}

export default SearchUser