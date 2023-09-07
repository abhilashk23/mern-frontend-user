import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function UpdatePF() {
    const history = useHistory();
    const [profileImage, setProfileImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        formData.append('token', token);

        try {
            await axios.post('https://user-login-api.onrender.com/users/updateProfile', formData)
                .then((response) => {
                    alert("Profile photo updated successfully");
                })
                .catch((e) => {
                    alert("Profile photo not updated");
                });
            history.push("/home/:username");
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfileImage(file);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="block text-lg font-medium text-gray-700">
                    Select a file:
                    <input
                        className="my-3 block" type="file" accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                {selectedFile && (
                    <div className="my-4">
                        <p className="text-gray-600">
                            Selected file: {selectedFile.name}
                        </p>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected File Preview"
                            className="mt-2 max-w-xs"
                        />
                    </div>
                )}
                <button type='submit' className=' bg-fuchsia-600 disabled:bg-neutral-300 text-white p-3 rounded-full font-medium text-md'>Update Profile image</button>
            </form>
        </div>
    )
}

export default UpdatePF