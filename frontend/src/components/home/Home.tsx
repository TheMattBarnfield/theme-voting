import React from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'

function Home() {
    return (
        <div>
            <Jumbotron>
                <h1>SoftJamGameWire</h1>
            </Jumbotron>
            <Link to="/suggest">Suggest a theme!</Link><br/>
            <Link to="/vote">Vote on the theme!</Link>
        </div>
    );
}

export default Home;
