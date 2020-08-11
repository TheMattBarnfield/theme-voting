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
    auth.signOut()
        .then(() => {
            console.log('User signed out');
        })
        .catch(() => {
            console.log('Error signing user out');
        });
}

const TopNavbar: React.FC<TopNavbarProps> = ({handleSignInModalOpen}) => {
    const authContext = useContext(AuthContext);

    const accountButton = authContext.user
        ?
        <Button variant="primary" onClick={handleSignOut}>
            Sign out
        </Button>
        :
        <Button variant="primary" onClick={handleSignInModalOpen}>
            Sign in
        </Button>

    return (
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="md">
            <LinkContainer to="/home">
                <Navbar.Brand>SoftJamGameWire</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbar-links" />
            <Navbar.Collapse id="navbar-links">
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
                <Nav>{accountButton}</Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNavbar;
