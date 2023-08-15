import React, { useState } from 'react';
import axios from 'axios'

function DelLink({ user }) {


    const handleSubmit = async (dellink) => {
        // e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/users/delLink', { token, title:dellink })
                .then((response) => {
                    alert(response.data.message);
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
                            return <p>{link.title}, - {link.url}, <button onClick={() => handleSubmit(link.title)}>Del</button></p>
                        })}
                    </div>
                    <div>
                        <a href = "/home/:username">Return to profile</a>
                    </div>
                </div>
            ) :
                (<p></p>)
            }
        </div >
    )
}

export default DelLink