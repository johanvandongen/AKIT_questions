import * as React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import QuestionForm from './QuestionForm';
import axios from 'axios';
import './index.css';
import './spinner.css';

Modal.setAppElement('#root');

export interface questionForm {
    question: string;
    author: string;
    issue: string;
    exerciseIds: string[];
    screenshot: string;
    chapter: string;
    treated: {
        state: string;
        remark: string;
    };
    answer: string;
    authorReply: string;
}
interface ICreateProps {
    refresh: () => void;
}
export default function Create({ refresh }: ICreateProps): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [succesful, setSuccesful] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = async (question: questionForm): Promise<void> => {
        setIsLoading(true);
        setError(false);
        setSuccesful(false);
        console.log(question);

        await axios
            .post('http://localhost:5050/record', JSON.stringify(question), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setIsLoading(false);
                console.log('no errorr', response);
                setSuccesful(true);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
                refresh();
            });
    };

    return (
        <div>
            <button
                onClick={() => {
                    console.log('here');
                    setModalIsOpen(true);
                }}
            >
                Create record
            </button>
            <Modal
                isOpen={modelIsOpen}
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
                    {isLoading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    )}
                    <div className="modal-header">
                        <h2>Add your question</h2>

                        <button
                            className="close"
                            onClick={() => {
                                setModalIsOpen(false);
                            }}
                        >
                            &#x2715;
                        </button>
                    </div>
                    <QuestionForm onSubmit={onSubmit} />

                    {error && (
                        <p>
                            Sending the question was not succesful. Make sure that all required
                            input fields are filled in.
                        </p>
                    )}
                    {succesful && <p>Question was sent succesfully!</p>}
                </div>
            </Modal>
        </div>
    );
}
