import * as React from 'react';
import { useContext, useState } from 'react';
import { Auth0Context } from '@auth0/auth0-react';
import './index.css';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function UserInfo(): JSX.Element {
    const { user } = useContext(Auth0Context);
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
                        width: '50%',
                        height: '70vh',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '1rem',
                    },
                }}
            >
                <div className="modal-content">
                    {user !== undefined &&
                        Object.keys(user).map((key, i) => (
                            <p key={i}>
                                <b>{key}:</b> <i>{user[key]}</i>
                            </p>
                        ))}
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
