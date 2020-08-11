import React, {FormEventHandler, useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ThemeClient from '../../../client/themeClient';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Optional from '../../../utils/optional';
import './Suggest.scss';

function Suggest() {
    const themeClient = new ThemeClient();
    const [theme, setTheme] = useState("");
    const [lastSubmission, setLastSubmission] = useState(Optional.empty<string>());
    const [error, setError] = useState(Optional.empty<string>());

    const handleSubmit: FormEventHandler = event => {
        event.preventDefault();
        setError(Optional.empty<string>());
        themeClient.suggestTheme(theme)
            .then(() => setLastSubmission(Optional.of(theme)))
            .catch(() => setError(Optional.of("Submission failed")));
        setTheme('');
    }

    return (
        <Container className="pt-5">
            {error.mapToComponent(e => <Alert variant='danger'>{e}</Alert>)}
            {lastSubmission.mapToComponent(t => <Alert variant='success'>Thanks! Your theme "{t}" has been suggested</Alert>)}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="theme-suggestion">
                    <Form.Label as="h1" className="mb-5">
                        Suggest a theme!
                    </Form.Label>
                    <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Your awesome theme"
                        value={theme}
                        maxLength={50}
                        // This regex is coupled with the theme suggestion endpoint
                        onChange={e => setTheme(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""))}
                        className="mb-5 theme-suggestion"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!theme}>
                    Submit theme suggestion
                </Button>
            </Form>
        </Container>
    );
}

export default Suggest;
