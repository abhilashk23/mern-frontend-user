import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function UpdatePF() {
    const history = useHistory();
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        formData.append('token', token);

        try {
            await axios.post('http://localhost:5000/users/updateProfile', formData)
                .then((response) => {
                    console.log(response.data);
                });
        }
        catch (error) {
            console.log(error);
        }


    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdatePF