import React from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

function Home() {
    return (
        <div>
            <Jumbotron>
                <h1>SoftJamGameWire</h1>
            </Jumbotron>
            <Container>
                <Link to="/suggest">Suggest a theme!</Link><br/>
                <Link to="/vote">Vote on the theme!</Link>
            </Container>
        </div>
    );
}

export default Home;
