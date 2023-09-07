import React, { useState } from 'react';
import axios from 'axios';

function PasswordUpdate() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://user-login-api.onrender.com/users/passwordUpdate', { token, oldPass: oldPass, newPass: newPass, confNewPass: confPass })
            .then((response) => {
                alert(response.data.message);
            })
            .catch((e) => {
                console.log(e);
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full my-3 gap-y-3'>
            <div className='w-4/5 flex flex-row items-center justify-items-center gap-x-4'>
                    <input type="password" name="oldpassword" id="oldpassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Old Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} required />
                </div>
                <div className='w-4/5 flex flex-row items-center justify-items-center gap-x-4'>
                    <input type="password" name="newpassword" id="newpassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                </div>
                <div className='w-4/5 flex flex-row items-center justify-items-center gap-x-4'>
                    <input type="password" name="confirmPass" id="confirmPass" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Confirm Password" value={confPass} onChange={(e) => setConfPass(e.target.value)} required />
                </div>



                <button type="submit" className='w-4/5 bg-fuchsia-600 disabled:bg-neutral-300 text-white disabled:text-neutral-500 p-2.5 rounded-full font-medium text-xl'>Change Password</button>
            </form>
        </div>
    )
}

export default PasswordUpdate