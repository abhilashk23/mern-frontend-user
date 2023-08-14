import React from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

function Header2({ user }) {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        history.push('/login');
        window.location.reload();
    };

    return (
        <div className='w-1/2 border-2 border-black rounded-full bg-white p-5 flex flex-row justify-between'>
            <div>
                <p className='p-1 text-2xl font-bold'>{user.profileImage ? (<img src={`http://localhost:5000/uploads/${user.profileImage}`} className='rounded-full w-10 h-10' alt="Profile" />) : (<p>{user.name}</p>)}</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-x-5'>
                <a href='/update'><WallpaperIcon /></a>
                <a href="/login" onClick={handleLogout}><LogoutIcon /></a>
            </div>
        </div>
    )
}

export default Header2