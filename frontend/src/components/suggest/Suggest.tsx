import React, {FormEventHandler, useEffect, useState} from 'react';
import axios from 'axios';

function Suggest() {
    const [theme, setTheme] = useState("");
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        axios.get('/api/themes')
            .then(res => setThemes(res.data));
    }, []);

    const handleSubmit: FormEventHandler = event => {
        event.preventDefault();
        axios.post('/api/theme', {
            theme
        });
        setTheme('');
    }

    return (
        <div>
            <h1>Suggest a theme!</h1>
            <form onSubmit={handleSubmit}>
                <input value={theme} onChange={event => setTheme(event.target.value)}/>
                <button>Submit theme suggestion</button>
            </form>
            <h2>Themes already suggested:</h2>
            <ul>
                {themes.map(t => <li>{t.theme}</li>)}
            </ul>
        </div>
    );
}

export default Suggest;
