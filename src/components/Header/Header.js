import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


function Header() {
    return (
        <div className='p-5 flex flex-row justify-between'>
            <div>
                <p className='p-1 text-2xl font-bold'>LOGO</p>
            </div>
            <div className='flex flex-row justify-between gap-x-5'>
                <Button variant='contained' disableElevation sx={{
                    textTransform: 'none',
                    backgroundColor: 'rgb(243 244 246)',
                    color: 'rgb(2 6 23)',
                    '&:hover': {
                        backgroundColor: 'rgb(243 244 246)',
                        color: 'rgb(2 6 23)',
                    }
                }}>
                    <span className='p-1 font-semibold'><a href="/login">Login</a></span>
                </Button>

                <Button variant='contained' disableElevation sx={{ borderRadius: 8, textTransform: 'none' }}>
                    <span className='p-1 font-semibold'><a href="/register">Sign Up, it's free!</a></span>
                </Button>
            </div>
        </div>
    )
}

export default Header