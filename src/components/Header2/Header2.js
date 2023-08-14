import React from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import axios from 'axios';

function Header2({ user }) {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        history.push('/login');
        window.location.reload();
    };

    const handleBgRemove = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/users/removeBg', { token })
                .then((response) => {
                    alert("BG removed successfully");
                    window.location.reload();
                })
                .catch((e) => {
                    alert(e);
                });
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleProfileRemove = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/users/removeProfile', { token })
                .then((response) => {
                    alert("Profile photo removed successfully");
                    window.location.reload();
                })
                .catch((e) => {
                    alert(e);
                });
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-1/2 border-2 border-black rounded-full bg-white p-5 flex flex-row justify-between'>
            <div>
                <a href='/update' title="Update profile image"><p className='p-1 text-2xl font-bold'>{user.profileImage ? (<img src={`http://localhost:5000/uploads/${user.profileImage}`} className='rounded-full w-10 h-10' alt="Profile" />) : (<p>{user.name}</p>)}</p></a>
            </div>
            <div className='flex flex-row justify-between items-center gap-x-5'>
                <a href="" onClick={handleProfileRemove} title="Update Background Image"><PersonRemoveAlt1Icon /></a>
                <a href="/addlinks" title="Add Link"><AddLinkIcon /></a>
                <a href="/addbg" title="Update Background Image"><WallpaperIcon /></a>
                <a href="" onClick={handleBgRemove} title="Update Background Image"><CancelPresentationIcon /></a>
                <a href="/login" onClick={handleLogout} title="Logout"><LogoutIcon /></a>
            </div>
        </div>
    )
}

export default Header2