import React, {FormEventHandler, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Suggest() {
    const [theme, setTheme] = useState("");

    const handleSubmit: FormEventHandler = event => {
        event.preventDefault();
        axios.post('/api/theme', {
            theme
        });
        setTheme('');
    }

    return (
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
    );
}

export default Suggest;
