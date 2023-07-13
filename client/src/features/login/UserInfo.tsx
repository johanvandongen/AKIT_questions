import * as React from 'react';
import { useContext, useState } from 'react';
import { Auth0Context } from '@auth0/auth0-react';
import './index.css';

import Modal from 'react-modal';
import Button from '../../components/ui/Button';
import { getUserRoles } from './userRole';

Modal.setAppElement('#root');

export default function UserInfo(): JSX.Element {
    const { user, logout } = useContext(Auth0Context);
    const [modelIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="user-container">
            <Modal
                isOpen={modelIsOpen}
                closeTimeoutMS={200}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
                style={{
                    content: {
                        width: '30%',
                        height: '70vh',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '1rem',
                    },
                }}
            >
                <div className="modal-content">
                    <div className="user-info">
                        {user !== undefined && (
                            <div>
                                <p>Hello {user.nickname}</p>
                                <p>
                                    Your roles:{' '}
                                    {getUserRoles(user).map((role) => (
                                        <span className={'role'} key={role}>
                                            {role}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}

                        <Button
                            onClick={() => {
                                logout({ logoutParams: { returnTo: window.location.origin } });
                            }}
                            text={'Log Out'}
                        />
                    </div>
                </div>
            </Modal>
            <img
                src={user?.picture}
                onClick={() => {
                    setModalIsOpen(true);
                }}
            />
        </div>
    );
}
