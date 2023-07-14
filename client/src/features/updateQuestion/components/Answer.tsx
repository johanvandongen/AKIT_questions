import * as React from 'react';
import { type IAnswer } from '../../../models/ITable';
import './index.css';

interface IAnswerProps {
    answer: IAnswer;
}

export default function Answer({ answer }: IAnswerProps): JSX.Element {
    return (
        <div className="answer">
            {answer.author !== null && <span className="answer-author">{answer.author}</span>}
            {answer.answer}
        </div>
    );
}
