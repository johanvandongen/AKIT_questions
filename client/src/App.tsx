import React, { useState } from 'react';
import './styling/App.css';
import Login from './features/login/Login';
import Home from './pages/Home';

function App(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const signIn = (username: string, password: string): void => {
        // TODO
        setIsLoggedIn(true);
    };

    return (
        <div className="App" style={{ backgroundColor: 'white' }}>
            {isLoggedIn ? (
                <Home />
            ) : (
                <Login
                    signIn={(username: string, password: string) => {
                        signIn(username, password);
                    }}
                />
            )}
        </div>
    );
}

export default App;
