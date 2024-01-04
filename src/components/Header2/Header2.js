import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Close, SearchRounded } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import BgUpdate from '../BgUpdate/BgUpdate';
import UpdatePF from '../UpdatePF/UpdatePF';
import PasswordUpdate from '../PasswordUpdate/PasswordUpdate';
import SearchUser from '../SearchUser/SearchUser';
import Drawer from '@mui/material/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import Divider from '@mui/material/Divider';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    '@media (min-width:1366px)': {
        width: 400
    },
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    '&:focus': {
        outline: 'none'
    },
};


function Header2({ user }) {
    const history = useHistory();
    const [bgOpen, setbgOpen] = useState(false);
    const handleBgOpen = () => setbgOpen(true);
    const handleBgClose = () => setbgOpen(false);

    const [profileOpen, setProfileOpen] = useState(false);
    const handleProfileOpen = () => setProfileOpen(true);
    const handleProfileClose = () => setProfileOpen(false);

    const [passOpen, setPassOpen] = useState(false);
    const handlePassOpen = () => setPassOpen(true);
    const handlePassClose = () => setPassOpen(false);

    const [openSearch, setOpenSearch] = React.useState(false);
    const handleSearchOpen = () => setOpenSearch(true);
    const handleSearchClose = () => setOpenSearch(false);

    const [drawer, setDrawer] = useState(false);
    const handleDrawerOpen = () => setDrawer(true);
    const handleDrawerClose = () => setDrawer(false);


    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        history.push('/login');
    };

    const handleBgRemove = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://user-login-api.onrender.com/users/removeBg', { token })
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
            await axios.post('https://user-login-api.onrender.com/users/removeProfile', { token })
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
        <div className='w-full 2xl:w-1/2 border-2 border-black rounded-full bg-white p-5 flex flex-row justify-between justify-items-center items-center'>
            <div className='hidden 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:items-center'>
                <a onClick={handleProfileOpen} title="Update profile image" cursor="pointer"><p className='p-1 text-2xl font-bold'>{user.profileImage ? (<img src={`${user.profileImage}`} className='rounded-full w-10 h-10' alt="Profile" />) : (<AccountCircleIcon fontSize='large' />)}</p></a>
            </div>
            <div className='flex flex-row justify-center items-center 2xl:hidden'>
                <p className='p-1 text-2xl font-bold'>{user.profileImage ? (<img src={`${user.profileImage}`} className='rounded-full w-12 h-12' alt="Profile" />) : (<AccountCircleIcon fontSize='large' />)}</p>
            </div>
            <div className='flex flex-row justify-items-centerjustify-center items-center px-2'>
                <a onClick={handleSearchOpen} title="Search user" className='text-lg 2xl:text-normal'><SearchIcon fontSize='large' /> Search</a>
            </div>
            <div className='hidden 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:gap-x-5'>
                {/* <a href="" title="Edit Profile"><ManageAccountsIcon /></a> */}
                {/* <a href="" onClick={handleProfileRemove} title="Remove profile photo" sx={{ cursor: 'pointer' }}><PersonRemoveAlt1Icon /></a> */}
                <a onClick={handleBgOpen} title="Update Background Image"><WallpaperIcon /></a>
                {/* <a href="" onClick={handleBgRemove} title="Remove Background Image"><CancelPresentationIcon /></a> */}
                <a href="/login" onClick={handleLogout} title="Logout"><LogoutIcon /></a>
                <a onClick={handlePassOpen} sx={{ cursor: "disabled" }} className='text-gray-400'><LockResetIcon /> Update Password</a>
            </div>

            {/* Mobile navbar */}
            <React.Fragment>
                <div className='2xl:hidden'>
                    <Button onClick={handleDrawerOpen}><SettingsIcon fontSize='large' /></Button>
                    <Drawer open={drawer} onClose={handleDrawerClose}>
                        <div className='w-screen p-5'>
                            <div className="mb-2 flex items-center justify-between p-4">
                                <h5 className='text-3xl font-semibold'>Settings</h5>
                                <Button onClick={handleDrawerClose}>
                                    <CloseIcon fontSize='large' />
                                </Button>
                            </div>
                            {/* <div className="my-2 flex items-center justify-center gap-x-4 p-4">
                                <a href="" className='text-md' onClick={handleProfileRemove} title="Remove profile photo" sx={{ cursor: 'pointer' }}><PersonRemoveAlt1Icon /> Remove profile photo</a>
                            </div> */}
                            <div className="my-2 flex items-center p-4 text-lg font-medium">
                                <a onClick={handleProfileOpen} title="Update Background Image"><AccountCircleIcon fontSize='large' /> Update Profile Photo</a>
                            </div>
                            <div className="my-2 flex items-center p-4 text-lg font-medium">
                                <a onClick={handleBgOpen} title="Update Background Image"><WallpaperIcon fontSize='large' /> Update Background</a>
                            </div>
                            <div className="my-2 flex items-center p-4 text-lg font-medium">
                                <a onClick={handlePassOpen} sx={{ cursor: "pointer" }}><LockResetIcon fontSize='large' /> Update Password</a>
                            </div>
                            <Divider />
                            <div className="my-2 flex items-center p-4 text-lg font-medium">
                                <a href="/login" onClick={handleLogout} title="Logout"><LogoutIcon fontSize='large' /> Logout</a>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </React.Fragment>

            {/* Bg update input */}
            <Modal
                open={bgOpen}
                onClose={handleBgClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <div className='w-full flex flex-row justify-end mb-5'>
                        <CloseIcon onClick={handleBgClose} sx={{ cursor: 'pointer' }} />
                    </div>
                    <div className='p-2 w-full'>
                        <BgUpdate />
                    </div>
                </Box>
            </Modal>

            {/* Profile photo update input */}
            <Modal
                open={profileOpen}
                onClose={handleProfileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='w-full flex flex-row justify-end mb-5'>
                        <CloseIcon onClick={handleProfileClose} sx={{ cursor: 'pointer' }} />
                    </div>
                    <div className='p-2 w-full'>
                        <UpdatePF />
                    </div>
                </Box>
            </Modal>

            {/* Password update input */}
            <Modal
                open={passOpen}
                onClose={handlePassClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='w-full flex flex-row justify-end mb-5'>
                        <CloseIcon onClick={handlePassClose} sx={{ cursor: 'pointer' }} />
                    </div>
                    <div className='p-2 w-full'>
                        <PasswordUpdate />
                    </div>
                </Box>
            </Modal>

            {/* Search user Modal */}
            <Modal
                open={openSearch}
                onClose={handleSearchClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='w-full flex flex-row justify-end mb-5'>
                        <CloseIcon onClick={handleSearchClose} sx={{ cursor: 'pointer' }} />
                    </div>
                    <div className='p-2 w-full'>
                        <SearchUser />
                    </div>
                </Box>
            </Modal>

        </div>

    )
}

export default Header2