import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>SoftJamGameWire</h1>
            <Link to="/suggest">Suggest a theme!</Link>
            <Link to="/vote">Vote on the theme!</Link>
        </div>
    );
}

export default Home;
