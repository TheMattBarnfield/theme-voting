import React, {FormEventHandler, useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ThemeClient from '../../../client/themeClient';
import Container from 'react-bootstrap/Container';

function Suggest() {
    const themeClient = new ThemeClient();
    const [theme, setTheme] = useState("");

    const handleSubmit: FormEventHandler = event => {
        event.preventDefault();
        themeClient.suggestTheme(theme);
        setTheme('');
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="theme-suggestion">
                    <Form.Label as="h1">
                        Suggest a theme!
                    </Form.Label>
                    <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Your awesome theme suggestion"
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit theme suggestion
                </Button>
            </Form>
        </Container>
    );
}

export default Suggest;
