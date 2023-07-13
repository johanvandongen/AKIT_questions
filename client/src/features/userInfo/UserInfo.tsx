import * as React from 'react';
import { UserContext } from './UserContext';
import { useContext, useState } from 'react';
import { Auth0Context } from '@auth0/auth0-react';
import Modal from 'react-modal';

// export interface IUserInfoProps {
// }

Modal.setAppElement('#root');

export default function UserInfo(): JSX.Element {
    const { userRole } = useContext(UserContext);
    const { user } = useContext(Auth0Context);
    const [modelIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
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
                <div className="modal-content">{JSON.stringify(user)}</div>
            </Modal>
            Me {userRole} {user?.email}
            <img
                src={user?.picture}
                onClick={() => {
                    setModalIsOpen(true);
                }}
            />
        </div>
    );
}
