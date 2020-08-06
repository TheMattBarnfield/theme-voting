import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import Vote from './components/vote/Vote';
import Suggest from './components/suggest/Suggest';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/home/Home';
import Vote from './components/pages/vote/Vote';
import Suggest from './components/pages/suggest/Suggest';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.scss'
import ProviderCollection from "./contexts/providerCollection";
import TopNavbar from "./components/misc/navbar";
import Button from "react-bootstrap/Button";
import SignInModal from "./components/signInModal/signInModal";
import {LinkContainer} from 'react-router-bootstrap';
import ThemeClient from './client/themeClient';


function App() {
    const [signInModalShowing, setSignInModalShowing] = useState(false);

    const handleSignInModalOpen = () => {
        setSignInModalShowing(true);
    }

    const handleSignInModalClose = () => {
        setSignInModalShowing(false);
    }

    return (
        <ProviderCollection>
            <Router>
                <TopNavbar handleSignInModalOpen={handleSignInModalOpen}/>
                <SignInModal isOpen={signInModalShowing} handleClose={handleSignInModalClose}/>
                <Switch>
                    <Route path="/suggest">
                        <Suggest/>
                    </Route>
                    <Route path="/vote">
                        <Vote/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </ProviderCollection>
    );
  const themeClient = new ThemeClient();

  return (
    <Router>
      <Navbar bg="primary" variant="dark">
        <LinkContainer to="/home">
          <Navbar.Brand>SoftJamGameWire</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/suggest">
            <Nav.Link>Suggest a theme</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/vote">
            <Nav.Link>Vote on themes</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/suggest">
          <Suggest />
        </Route>
        <Route path="/vote">
          <Vote getUnvotedTheme={() => themeClient.getUnvotedTheme()}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
