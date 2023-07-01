import * as React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import QuestionForm from './QuestionForm';
import './index.css';

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

export default function Create(): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (question: questionForm): Promise<void> => {
        setIsLoading(true);
        // e.preventDefault();
        // const newDoc = { name: 'jop', position: 'man', level: 'high' };
        const newDoc = { ...question };
        console.log(newDoc);

        await fetch('http://localhost:5050/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDoc),
        })
            .then((response) => {
                setIsLoading(false);
                console.log('no errorr', response);
            })
            .catch((error) => {
                console.log(error);
                // window.alert(error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
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
            <Modal isOpen={modelIsOpen}>
                {isLoading && <p>Loading...</p>}
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
            </Modal>
        </div>
    );
}
