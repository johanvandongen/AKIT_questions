import './modal.css';
import * as React from 'react';
import Modal from 'react-modal';
import { Button } from '../../../components/ui';

export interface ITableViewProps {
    modalIsOpen: boolean;
    setModalIsOpen: (modelIsOpen: boolean) => void;
    callback: any;
}
Modal.setAppElement('#root');

/**
 * Confirm modal displays text with two buttone. 1 button to cancel and close the modal,
 * and 1 button to execute the callback fucntion.
 * @param modalIsOpen whether the modal should be visible
 * @param setModalIsOpen function to close the modal
 * @param callback function that is executed when the button is clicked
 */
export function ConfirmModal({
    modalIsOpen,
    setModalIsOpen,
    callback,
}: ITableViewProps): JSX.Element {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => {
                setModalIsOpen(false);
            }}
            style={{
                content: {
                    width: '50%',
                    height: '20vh',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -10%)',
                    borderRadius: '1rem',
                },
            }}
        >
            <div className="confirm-delete-container">
                <p>Are you sure you want to delete this table?</p>
                <div className="dialog-buttons">
                    <Button
                        onClick={() => {
                            setModalIsOpen(false);
                        }}
                        text={'Cancel'}
                    />
                    <Button
                        onClick={() => {
                            if (callback !== null) {
                                void callback();
                            }
                            setModalIsOpen(false);
                        }}
                        theme={'red-white'}
                        text={'Delete'}
                    />
                </div>
            </div>
        </Modal>
    );
}
