import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Vote from './components/vote/Vote';
import Suggest from './components/suggest/Suggest';

function App() {
  return (
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
  );
}

export default App;
