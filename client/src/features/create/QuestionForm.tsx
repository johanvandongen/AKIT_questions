import * as React from 'react';
import { useState } from 'react';
import './index.css';
import { type questionForm } from './Create';

enum authors {
    JAYIN = 'Jayin',
    JOHAN = 'Johan',
    KAY = 'Kay',
    SEBAS = 'Sebas',
}

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
        <div className="form-container">
            <form className="form">
                <div className="input-field">
                    <p>Question</p>

                    <textarea
                        value={question.question}
                        placeholder={'question'}
                        required={true}
                        onChange={(e) => {
                            setQuestion((prev) => ({ ...prev, question: e.target.value }));
                        }}
                    />
                    <span>Question should not be empty</span>
                </div>

                <div className="input-field">
                    <p>author</p>
                    <select
                        required={true}
                        onChange={(e) => {
                            setQuestion((prev) => ({
                                ...prev,
                                author: authors[e.target.value as keyof typeof authors],
                            }));
                        }}
                    >
                        <option disabled selected value={''}>
                            -- select an option --
                        </option>
                        {Object.keys(authors).map((key) => (
                            <option key={key} value={key}>
                                {authors[key as keyof typeof authors]}
                            </option>
                        ))}
                    </select>
                    <span>Author must be selected</span>
                </div>
                <div className="input-field">
                    <p>Exercise id</p>

                    <input
                        type="text"
                        placeholder={'exercise id'}
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
                        placeholder={'chapter'}
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
                        placeholder={'issue id'}
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
