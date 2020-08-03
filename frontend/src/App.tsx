import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Vote from './components/vote/Vote';
import Suggest from './components/suggest/Suggest';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.scss'

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">SoftJamGameWire</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/suggest">Suggest a theme</Nav.Link>
          <Nav.Link href="/vote">Vote on themes</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
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
    </div>
  );
}

export default App;
