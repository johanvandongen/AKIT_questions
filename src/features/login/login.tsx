import * as React from 'react';
import Button from '../../components/ui/Button';

export interface ILoginProps {
    setUser: (s: any) => void;
    setAccessToken: (s: string) => void;
}

export function Login({ setUser, setAccessToken }: ILoginProps): JSX.Element {
    return (
        <div>
            <Button
                onClick={() => {
                    console.log('Log in');
                }}
                text={'Login'}
            />
        </div>
    );
}
