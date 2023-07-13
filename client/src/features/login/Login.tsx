import * as React from 'react';
import Button from '../../components/ui/Button';
import { useAuth0 } from '@auth0/auth0-react';

interface ILoginProps {
    signIn: (username: string, password: string) => void;
}

export default function Login({ signIn }: ILoginProps): JSX.Element {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div>
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
                text={'Login'}
            />

            <button
                onClick={() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                }}
            >
                Log Out
            </button>
        </div>
    );
}
