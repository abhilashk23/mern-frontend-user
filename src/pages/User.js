import React from 'react';
import Home from '../components/Home/Home';
import Header2 from '../components/Header2/Header2';


function User({ user }) {

    return (
        <div>
            {/* <Header2 /> */}
            <Home user={user} />
        </div>
    )
}

export default User