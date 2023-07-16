import React, { useEffect } from 'react';
import './styling/App.css';
import Login from './features/login/Login';
import Home from './pages/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from './components/ui';
import { updateToken } from './utils/axiosInstance';

function App(): JSX.Element {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const handleToken = async (): Promise<void> => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                console.log(token);
                updateToken(token);
            }
        };
        void handleToken();
    }, [isAuthenticated]);

    return (
        <div className="App" style={{ backgroundColor: 'white' }}>
            {isLoading && <Spinner text={'Logging in'} opacity={0.9} />}
            {isAuthenticated ? <Home /> : <Login />}
        </div>
    );
}

export default App;
