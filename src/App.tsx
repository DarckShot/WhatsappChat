import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App: React.FC = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (id: string, token: string) => {
        setIdInstance(id);
        setApiTokenInstance(token);
        setLoggedIn(true);
    };

    return (
        <>
            {!loggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
            )}
        </>
    );
};

export default App;