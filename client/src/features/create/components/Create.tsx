import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import QuestionForm from './QuestionForm';
import './index.css';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/spinner/Spinner';
import useCreateQuestion from '../hooks/useCreateQuestion';
import { RequestState } from '../../../models/IRequest';
import { type IAnswer } from '../../../models/ITable';

Modal.setAppElement('#root');

export interface questionForm {
    question: string;
    author: string;
    issue: string;
    exerciseIds: string[];
    screenshot: File[];
    chapter: string;
    treated: {
        state: string;
        remark: string;
    };
    answer: IAnswer[];
    authorReply: IAnswer[];
}

interface ICreateProps {
    refresh: () => void;
}

/**
 * Create button that will open a modal when clicked.
 * This modal will allow you to input data and send it to the API.
 * @param refresh function to refetch all data from the API.
 */
export default function Create({ refresh }: ICreateProps): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const { requestState, createQuestion } = useCreateQuestion();

    useEffect(() => {
        if (requestState.state === RequestState.Successful) {
            refresh();
        }
    }, [requestState.state]);

    return (
        <div>
            <Button
                onClick={() => {
                    console.log('here');
                    setModalIsOpen(true);
                }}
                text={'Create question'}
                theme={'orange'}
            />
            <Modal
                isOpen={modelIsOpen}
                closeTimeoutMS={200}
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
                    {requestState.state === RequestState.Loading && <Spinner />}
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
                    <QuestionForm onSubmit={createQuestion} requestState={requestState} />
                </div>
            </Modal>
        </div>
    );
}
