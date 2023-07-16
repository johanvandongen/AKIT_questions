import * as React from 'react';
import { type IAnswer } from '../../../models/ITable';
import './tableStyles.css';

interface IAnswerProps {
    answer: IAnswer;
}

/**
 * Renders a answer
 * @param answer answer object with info about the answer (author, date, answer, etc..)
 */
export default function Answer({ answer }: IAnswerProps): JSX.Element {
    return (
        <div className="answer">
            {answer.author !== null && <span className="answer-author">{answer.author}</span>}
            {answer.answer}
        </div>
    );
}
