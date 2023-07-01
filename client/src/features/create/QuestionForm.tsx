import * as React from 'react';
import { useState } from 'react';
import './index.css';
import { type questionForm } from './Create';

export interface IQuestionFormProps {
    onSubmit: any;
}

export default function QuestionForm({ onSubmit }: IQuestionFormProps): JSX.Element {
    const [question, setQuestion] = useState<questionForm>({
        question: '',
        author: '',
        issue: '',
        exerciseIds: [],
        screenshot: '',
        chapter: '',
        treated: {
            state: 'No',
            remark: '',
        },
        answer: '',
        authorReply: '',
    });

    return (
        <div className="form">
            <form>
                <div className="input-field">
                    <p>Question</p>

                    <input
                        type="text"
                        value={question.question}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, question: e.target.value }));
                        }}
                    />
                </div>

                <div className="input-field">
                    <p>author</p>

                    <input
                        type="text"
                        value={question.author}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, author: e.target.value }));
                        }}
                    />
                </div>
                <div className="input-field">
                    <p>Exercise id</p>

                    <input
                        type="text"
                        value={question.exerciseIds}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, exerciseIds: [e.target.value] }));
                        }}
                    />
                </div>

                <div className="input-field">
                    <p>Chapter</p>

                    <input
                        type="text"
                        value={question.chapter}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, chapter: e.target.value }));
                        }}
                    />
                </div>

                <div className="input-field">
                    <p>Issue</p>

                    <input
                        type="text"
                        value={question.issue}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, issue: e.target.value }));
                        }}
                    />
                </div>
            </form>
            <button
                name="up"
                className="post-button"
                onClick={() => {
                    console.log('question data:', question);
                    onSubmit(question);
                }}
            >
                Send question
            </button>
        </div>
    );
}
