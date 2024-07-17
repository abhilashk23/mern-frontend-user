import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './BgUpdate.css'
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function BgUpdate() {
    const history = useHistory();
    const [bgImage, setBgImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('bgImage', bgImage);
        formData.append('token', token);

        try {
            await axios.post('http://user-login-api-868610282.ap-south-1.elb.amazonaws.com/users/updateBg', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
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
        setBgImage(file);
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row justify-start items-center my-4'>
                    {/* <label className="text-xl font-medium text-gray-700">
                        Select a file:
                    </label> */}
                    <Button component="label" variant="outlined" startIcon={<CloudUploadIcon fontSize='large' />} color='secondary'>
                        <p className='text-lg cursor-pointer'>Upload File</p>
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                    </Button>
                </div>
                {selectedFile && (
                    <div className="my-4 w-full">
                        <p className="text-gray-600">
                            Selected file: {selectedFile.name}
                        </p>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected File Preview"
                            className="mt-2 max-w-[200px] max-h-[200px]"
                        />
                    </div>
                )}
                <button type='submit' className=' bg-fuchsia-600 disabled:bg-neutral-300 text-white p-3 rounded-full font-medium text-md'>Update Background image</button>
            </form>
        </div>
    )
}

{/*
<input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 appearance-none text-center" type="file" accept="image/*" onChange={(e) => setBgImage(e.target.files[0])} required />
                <button type='submit'>Submit</button>
 */}

export default BgUpdate