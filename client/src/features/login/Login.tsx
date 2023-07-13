import * as React from 'react';
import Button from '../../components/ui/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login(): JSX.Element {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div className="login-container">
            <h1>Welcome to the Algebrakit question platform</h1>
            <h3>Please login to continue</h3>
            <div className="button-container">
                <Button
                    onClick={() => {
                        try {
                            void loginWithRedirect();
                            console.log('ded');
                        } catch (err) {
                            console.log('too bad', err);
                        }
                        console.log('signinn');
                    }}
                    fullWidth={true}
                    text={'Login'}
                />

                <Button
                    onClick={() => {
                        logout({ logoutParams: { returnTo: window.location.origin } });
                    }}
                    fullWidth={true}
                    text={'Log out'}
                />
            </div>
        </div>
    );
}
