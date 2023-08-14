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
        await axios.post('http://localhost:5000/users/addLinks', { token, title, url })
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
                <input type='text' name="title" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type='text' name="url" placeholder='URL' value={url} onChange={(e) => setUrl(e.target.value)} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LinkUpdate
