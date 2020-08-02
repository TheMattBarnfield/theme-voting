import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get('/api/hello-world')
        .then(response => setMessage(response.data))
  }, [])

  return (
    <div className="App">
        <p>{message}</p>
    </div>
  );
}

export default App;
