import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Vote from './components/vote/Vote';
import Suggest from './components/suggest/Suggest';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.scss'
import {LinkContainer} from 'react-router-bootstrap';

function App() {
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
          <Vote />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
