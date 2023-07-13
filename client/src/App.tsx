import React, { useEffect, useState } from 'react';
import './styling/App.css';
import Login from './features/login/Login';
import Home from './pages/Home';
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';
import { UserContext } from './features/userInfo/UserContext';

function App(): JSX.Element {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userRole, setUserRole] = useState<string[]>([]);

    const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
    console.log(domain, user, isAuthenticated, isLoading);

    useEffect(() => {
        const getUserMetadata = async (): Promise<void> => {
            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: 'read:current_user',
                    },
                });

                console.log('token', accessToken, jwt_decode(accessToken));

                const info: {
                    'https://my-app.example.com/roles': string[];
                    sub: string;
                } = jwt_decode(accessToken);
                const userRoles = info['https://my-app.example.com/roles'];
                console.log(userRoles);
                setUserRole(userRoles);
            } catch (e) {
                console.log('error', e);
            }
        };

        void getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    return (
        <div className="App" style={{ backgroundColor: 'white' }}>
            {isAuthenticated ? (
                <UserContext.Provider value={{ userRole }}>
                    <Home />
                </UserContext.Provider>
            ) : (
                <Login
                    signIn={(username: string, password: string) => {
                        // signIn(username, password);
                    }}
                />
            )}
        </div>
    );
}

export default App;
