import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import React from "react";
import SignInForm from "./signInForm";
import SignUpForm from "./signUpForm";

interface SignInFormProps {
    isOpen: boolean;
    handleClose: () => void;
}

const SignInModal: React.FC<SignInFormProps> = ({isOpen, handleClose}) => {
    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign in to SoftJamGameWire</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Tabs defaultActiveKey="sign-in" id="uncontrolled-tab-example">
                    <Tab eventKey="sign-in" title="Sign in" className="pt-3">
                        <SignInForm handleSubmitted={handleClose}/>
                    </Tab>
                    <Tab eventKey="sign-up" title="Sign up" className="pt-3">
                        <SignUpForm handleSubmitted={handleClose}/>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}

export default SignInModal;
