import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/home/Home';
import Vote from './components/pages/vote/Vote';
import Suggest from './components/pages/suggest/Suggest';
import './App.scss'
import ProviderCollection from "./contexts/providerCollection";
import TopNavbar from "./components/misc/navbar";
import SignInModal from "./components/signInModal/signInModal";
import ThemeClient from './client/themeClient';
import Button from 'react-bootstrap/Button'
import {functions} from "./firebase";


function App() {
    const [signInModalShowing, setSignInModalShowing] = useState(false);
    const themeClient = new ThemeClient();

    const handleSignInModalOpen = () => {
        setSignInModalShowing(true);
    }

    const handleSignInModalClose = () => {
        setSignInModalShowing(false);
    }

    const handleUpVoteClick = () => {
        var upVoteTheme = functions.httpsCallable('upVoteTheme');
        upVoteTheme({themeId: 'SKvT8DQQzXoCnhKDPCen'}).then((result) => {
            console.log(result.data)
        });
    }

    return (
        <ProviderCollection>
            <Router>
                <TopNavbar handleSignInModalOpen={handleSignInModalOpen}/>
                <SignInModal isOpen={signInModalShowing} handleClose={handleSignInModalClose}/>
                <Button onClick={handleUpVoteClick}>Upvote</Button>
                <Switch>
                    <Route path="/suggest">
                        <Suggest/>
                    </Route>
                    <Route path="/vote">
                        <Vote getUnvotedTheme={() => themeClient.getUnvotedTheme()}/>
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
