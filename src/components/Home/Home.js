import React from 'react'
import { useHistory } from 'react-router-dom';


function Home({ user }) {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        history.push('/login');
        window.location.reload();
    };
    return (
        <div>
            <div>
                {user.name}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>
                {user.profileImage && <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt="Profile" />}
            </div>
        </div>
    )
}

export default Home