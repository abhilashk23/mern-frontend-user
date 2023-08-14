import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function BgUpdate() {
    const history = useHistory();
    const [bgImage, setBgImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('bgImage', bgImage);
        formData.append('token', token);

        try {
            await axios.post('http://localhost:5000/users/updateBg', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(e =>{
                    console.log(e);
                });
            history.push("/home/:username");
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={(e) => setBgImage(e.target.files[0])} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default BgUpdate