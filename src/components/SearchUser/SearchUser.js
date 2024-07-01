import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
import debounce from 'lodash.debounce';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SearchUser.css';

function SearchUser() {
    const [searchuser, setSearchUser] = useState('');
    // const [result, setResult] = useState(null);
    // const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (searchuser) {
            fetchSuggestions(searchuser);
        } else {
            setSuggestions([]);
        }
    }, [searchuser]);

    const fetchSuggestions = useCallback(
        debounce(async (query) => {
            try {
                const response = await axios.get(`https://user-login-api.onrender.com/users/suggestions?query=${query}`);
                setSuggestions(response.data.slice(0, 5));
            } catch (error) {
                setSuggestions([]);
            }
        }, 300),
        []
    );

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('https://user-login-api.onrender.com/users/searchUser', { username: searchuser });
    //         setResult(response.data);
    //         setError(null);
    //         setSuggestions([]);
    //     } catch (e) {
    //         setResult(null);
    //         setError({ message: 'No such user found!! Please check the spelling' });
    //     }
    // };

    const handleSuggestionClick = (username) => {
        // setSuggestions([]);
        window.open(`/user/${username}`, '_blank');
    };

    const clearSearch = () => {
        setSearchUser('');
        setSuggestions([]);
    };

    // let mainLinks = null;
    // let otherLinks = null;

    // if (result !== null) {
    //     mainLinks = result.links.filter((link) =>
    //         ['instagram', 'twitter', 'facebook', 'linkedin', 'github', 'youtube'].includes(link.title.toLowerCase())
    //     );

    //     otherLinks = result.links.filter((link) =>
    //         !['instagram', 'twitter', 'facebook', 'linkedin', 'github', 'youtube'].includes(link.title.toLowerCase())
    //     );
    // }

    return (
        <div className='p-5'>
            <div className='flex flex-row gap-x-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary-600 focus:border-primary-600 w-full p-2.5'>
                <SearchIcon />
                <input
                    type='text'
                    className='w-full bg-gray-50 focus:outline-none'
                    placeholder='Enter exact user to search'
                    value={searchuser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    required
                />
                <button type='reset' onClick={clearSearch}><CloseIcon /></button>
            </div>

            <TransitionGroup>
                {suggestions.length > 0 && (
                    <CSSTransition classNames="fade" timeout={300}>
                        <div className='bg-white border border-gray-300 mt-2 rounded-lg shadow-lg'>
                            {suggestions.map((user, index) => (
                                <div key={index} className='p-2 flex flex-row justify-items-center gap-x-3 hover:bg-gray-100 cursor-pointer' onClick={() => handleSuggestionClick(user.username)}>
                                    {user.profileImage ? (
                                        <img src={`${user.profileImage}`} className='rounded-full w-16 h-16' alt="Profile" />
                                    ) : (
                                        <AccountCircleIcon sx={{ fontSize: 50 }} />
                                    )}
                                    <div>
                                        <p className='font-semibold'>{user.name}</p>
                                        <p className='text-gray-500'>@{user.username}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>

            {/* {result !== null ? (
                <div>
                    <div className='mt-5 flex flex-col 2xl:flex-row gap-x-5 items-center justify-items-center'>
                        {result.profileImage ? (
                            <img src={`${result.profileImage}`} className='rounded-full w-28 h-28' alt="Profile" />
                        ) : (
                            <AccountCircleIcon sx={{ fontSize: 50 }} />
                        )}
                        <div>
                            <h1 className='pt-2 font-bold text-lg'>{result.name}</h1>
                            <p className='font-semibold text-md text-center 2xl:text-left' style={{ color: 'black' }}>@{result.username}</p>
                            <div className='my-2 flex flex-row justify-center 2xl:justify-start gap-x-3'>
                                {mainLinks.map((link, index) => {
                                    const Icon = getIconComponent(link.title.toLowerCase());
                                    return <a key={index} href={link.url} target='_blank' rel='noopener noreferrer'><Icon fontSize='medium' /></a>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 flex flex-col justify-center w-full gap-y-3'>
                        {otherLinks.map((link, index) => (
                            <div key={index} className='bg-beige-500 border-2 border-black rounded-lg text-center p-2 w-full'>
                                <a href={link.url} target="_blank" rel='noopener noreferrer'>
                                    {link.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
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
                )
            )} */}
        </div>
    );
}


export default SearchUser;
