import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import QuestionForm from './QuestionForm';
import './index.css';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/spinner/Spinner';
import useCreateQuestion from './hooks/useCreateQuestion';
import { RequestState } from '../../models/IRequest';

Modal.setAppElement('#root');

export interface questionForm {
    question: string;
    author: string;
    issue: string;
    exerciseIds: string[];
    screenshot: string[];
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

                    {/* {requestState.state === RequestState.Error && <p>{requestState.message}</p>}
                    {requestState.state === RequestState.Successful && (
                        <p>{requestState.message}</p>
                    )} */}
                </div>
            </Modal>
        </div>
    );
}
