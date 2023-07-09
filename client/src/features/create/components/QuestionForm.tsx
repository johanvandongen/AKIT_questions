import * as React from 'react';
import { useState } from 'react';
import './index.css';
import { type questionForm } from './Create';
import Button from '../../../components/ui/Button';
import { type IRequest, RequestState } from '../../../models/IRequest';
import ImageUpload from './ImageUpload';

enum authors {
    JAYIN = 'Jayin',
    JOHAN = 'Johan',
    KAY = 'Kay',
    SEBAS = 'Sebas',
}

export interface IQuestionFormProps {
    onSubmit: any;
    requestState: IRequest;
}

/**
 * Renders a form with file upload.
 * @param onSubmit function that gets called with all form inputs.
 * @param requestState the request state of the post function, so that the error can be displayed in this form.
 */
export default function QuestionForm({ onSubmit, requestState }: IQuestionFormProps): JSX.Element {
    const [question, setQuestion] = useState<questionForm>({
        question: '',
        author: '',
        issue: '',
        exerciseIds: [],
        screenshot: [],
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
                <div className="input-field-row">
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
                </div>

                <div className="input-field-row">
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
                </div>
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

                <ImageUpload
                    addImages={(images: string[]) => {
                        setQuestion((prev) => ({ ...prev, screenshot: images }));
                    }}
                />
            </form>
            <div className="question-submit">
                {requestState.state === RequestState.Error && <p>{requestState.message}</p>}
                {requestState.state === RequestState.Successful && <p>{requestState.message}</p>}
                <Button
                    onClick={() => {
                        console.log('question data:', question);
                        onSubmit(question);
                    }}
                    text={'Send question'}
                />
            </div>
        </div>
    );
}
