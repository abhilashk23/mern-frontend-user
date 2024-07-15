import React from 'react';
import Button from '@mui/material/Button';
import logo from '../../images/logo.png';

function Header() {
    return (
        <div className='border-2 border-black rounded-full bg-white px-3 flex flex-row justify-between items-center'>
            <div className='flex-1 flex items-center'> {/* Center the logo within this div */}
                <img src={logo} className='-mb-5 xl:-mb-3 h-24 w-24' alt="Logo" /> {/* Added alt attribute for accessibility */}
            </div>
            <div className='flex flex-row justify-between items-center gap-x-3'>
                <a href="/login">
                    <Button variant='contained' disableElevation sx={{
                        textTransform: 'none',
                        backgroundColor: 'rgb(243 244 246)',
                        color: 'rgb(2 6 23)',
                        '&:hover': {
                            backgroundColor: 'rgb(243 244 246)',
                            color: 'rgb(2 6 23)',
                        }
                    }}>
                        <span className='p-1 font-semibold'>Login</span>
                    </Button>
                </a>
                <a href="/register">
                    <Button variant='contained' disableElevation sx={{
                        borderRadius: 8,
                        textTransform: 'none',
                        backgroundColor: "#1E2330",
                        '&:hover': {
                            backgroundColor: "#1E2330"
                        }
                    }}>
                        <span className='p-1 font-semibold'>Sign Up free</span>
                    </Button>
                </a>
            </div>
        </div>
    );
}

export default Header;
