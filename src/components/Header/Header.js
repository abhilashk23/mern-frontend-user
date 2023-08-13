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
                    <Button variant='contained' disableElevation sx={{ borderRadius: 8, textTransform: 'none' }}>
                        <span className='p-1 font-semibold'>Sign Up, it's free!</span>
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default Header