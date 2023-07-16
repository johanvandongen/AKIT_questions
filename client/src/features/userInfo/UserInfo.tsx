import * as React from 'react';
import { useContext, useState } from 'react';
import { Auth0Context } from '@auth0/auth0-react';
import './index.css';
import Modal from 'react-modal';
import { getUserRoles, hasRole } from '../login/userRole';
import { Button, Spinner } from '../../components/ui';
import { RequestState } from '../../models/IRequest';
import useExportSplit from './hooks/useExportSplit';
import useExportUnified from './hooks/useExportUnified';

Modal.setAppElement('#root');

/**
 * Displays the user picture icon. When clicked on this a modal opens up with
 * additional user information.
 */
export default function UserInfo(): JSX.Element {
    const { user, logout } = useContext(Auth0Context);
    const [modelIsOpen, setModalIsOpen] = useState(false);

    const { requestState: splitState, exportSplit } = useExportSplit();
    const { requestState: unifiedState, exportUnified } = useExportUnified();

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
                <div className="user-modal-content">
                    {(splitState.state === RequestState.Loading ||
                        unifiedState.state === RequestState.Loading) && (
                        <Spinner text={'Exporting...'} />
                    )}
                    <div className="user-info">
                        {user !== undefined && (
                            <div>
                                <p>Hello {user.nickname}</p>
                                <p>Your roles: {getUserRoles(user).join(' / ')}</p>
                            </div>
                        )}

                        {hasRole(user, 'senior-author') && (
                            <div className="export-links">
                                <p>Export database to csv files:</p>
                                <div className="export-buttons-container">
                                    <Button
                                        onClick={() => {
                                            void exportUnified();
                                        }}
                                        text={'Export unified'}
                                    />
                                    <Button
                                        onClick={() => {
                                            void exportSplit();
                                        }}
                                        text={'Export split'}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="logout-button">
                            <Button
                                onClick={() => {
                                    logout({ logoutParams: { returnTo: window.location.origin } });
                                }}
                                text={'Log Out'}
                                fullWidth={true}
                            />
                        </div>
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
