import {LinkContainer} from "react-router-bootstrap";
import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import AuthContext from "../../contexts/authContext";
import {auth} from "../../firebase";

interface TopNavbarProps {
    handleSignInModalOpen: () => void;
}

const handleSignOut = () => {
    auth.signOut();
}

const TopNavbar: React.FC<TopNavbarProps> = ({handleSignInModalOpen}) => {
    const authContext = useContext(AuthContext);

    return (
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
            {
                authContext.user
                    ?
                    <Button variant="primary" onClick={handleSignOut}>
                        Sign out
                    </Button>
                    :
                    <Button variant="primary" onClick={handleSignInModalOpen}>
                        Sign in
                    </Button>
            }
        </Navbar>
    )
}

export default TopNavbar;
