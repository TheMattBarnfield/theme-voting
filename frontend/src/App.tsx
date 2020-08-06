import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import Vote from './components/vote/Vote';
import Suggest from './components/suggest/Suggest';
import './App.scss'
import ProviderCollection from "./contexts/providerCollection";
import TopNavbar from "./components/misc/navbar";
import Button from "react-bootstrap/Button";
import SignInModal from "./components/signInModal/signInModal";


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
}

export default App;
