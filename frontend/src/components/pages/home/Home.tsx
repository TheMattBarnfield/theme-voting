import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "./Home.scss";

function Home() {
    return (
        <div className="home">
            <Jumbotron>
                <Container>
                    <h1>SoftJamGameWire I</h1>
                    <p>Fri 14th-Sun 16th August 2020</p>
                </Container>
            </Jumbotron>
            <Container>
                <h2>Schedule</h2>
                <ul>
                    <li>12/08/2020: Theme suggestions and voting open</li>
                    <li>14/08/2020: The game jam starts! Join us in discord at 9am for a kick off session
                        with the official theme announcement and an opportunity to find yourself a team.</li>
                    <li>16/08/2020: Submit your game by 10pm!</li>
                    <li>17/08/2020 onwards: Play as many of the games as you can!</li>
                    <li>21/08/2020: We'll all get together on third Friday to play some games</li>
                    <li>27/08/2020: Lunch and learn for people to show off their creations along with the prize ceremony.</li>
                </ul>
                <h2>Additional info</h2>
                <ul>
                    <li>You can take 1 day of morale holiday for the Friday.</li>
                    <li>You can expense two meals (up to £10 each) from tech over the weekend.</li>
                    <li>If you have any questions, get in touch with Matt Barnfield or ask #game-development on slack.</li>
                </ul>
            </Container>
        </div>
    );
}

export default Home;
