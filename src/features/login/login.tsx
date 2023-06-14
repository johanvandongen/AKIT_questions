import * as React from 'react';
import Button from '../../components/ui/Button';

interface ILoginProps {
    signIn: (username: string, password: string) => void;
}

export default function Login({ signIn }: ILoginProps): JSX.Element {
    return (
        <div>
            <Button
                onClick={() => {
                    signIn('test', 'test');
                }}
                text={'Login'}
            />
        </div>
    );
}
