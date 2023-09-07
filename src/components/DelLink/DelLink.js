import React, { useEffect, useState } from 'react';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DelLink({ user }) {

    const handleSubmit = async (dellink) => {
        // e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('https://user-login-api.onrender.com/users/delLink', { token, title: dellink })
                .then((response) => {
                    alert(response.data.message);
                    window.location.reload();
                })
                .catch(error => {
                    alert(error);
                })
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            {user ? (
                <div>
                    <div>
                        {user.links.map((link, index) => {
                            return <div className='flex flex-row justify-between items-center bg-biege-500 rounded-lg text-center p-2 '>
                                <a href={link.url} target="_blank">
                                    {link.title}
                                </a>
                                <button onClick={() => handleSubmit(link.title)} className='text-red-500'><DeleteIcon /></button>
                            </div>
                        })}
                    </div>
                </div>
            ) :
                (<p></p>)
            }
        </div>
    )
}

export default DelLink