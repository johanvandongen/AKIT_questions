import React, { useEffect, useState } from 'react';
import './styling/App.css';
import Login from './features/login/Login';
import Home from './pages/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from './components/ui';
import { updateToken } from './utils/axiosInstance';

function App(): JSX.Element {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [tokenIsLoading, setTokenIsLoading] = useState(false);
    const [tokenLoadedSuccesfully, setTokenLoadedSuccesfully] = useState(false);

    useEffect(() => {
        const handleToken = async (): Promise<void> => {
            setTokenIsLoading(true);
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                updateToken(token);
                setTokenLoadedSuccesfully(true);
            }
            setTokenIsLoading(false);
        };
        void handleToken();
    }, [isAuthenticated]);

    return (
        <div className="App" style={{ backgroundColor: 'white' }}>
            {isLoading && <Spinner text={'Logging in'} opacity={0.9} />}
            {tokenIsLoading && <Spinner text={'Setting tokens'} opacity={0.9} />}
            {isAuthenticated && tokenLoadedSuccesfully ? <Home /> : <Login />}
        </div>
    );
}

export default App;
