import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LinkUpdate() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        await axios.post('https://user-login-api.onrender.com/users/addLinks', { token, title, url })
            .then((response) => {
                alert(response.data.message);
                history.push("/home/:username");
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full my-3 gap-y-3'>
                <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type='text' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="url" placeholder='URL' value={url} onChange={(e) => setUrl(e.target.value)} required />

                <button type="submit" className='w-4/5 bg-fuchsia-600 disabled:bg-neutral-300 text-white disabled:text-neutral-500 p-2.5 rounded-full font-medium text-xl'>Add link</button>
            </form>
        </div>
    )
}

export default LinkUpdate
