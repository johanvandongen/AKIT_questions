import * as React from 'react';
import { type IAnswer } from '../../../models/ITable';
import './tableStyles.css';
import { ImageList } from '../../../components/ui';

interface IAnswerProps {
    answer: IAnswer;
    setCurrentImage: (image: string) => void;
}

/**
 * Renders a answer
 * @param answer answer object with info about the answer (author, date, answer, etc..)
 */
export default function Answer({ answer, setCurrentImage }: IAnswerProps): JSX.Element {
    return (
        <div className="answer">
            {answer.author !== null && <span className="answer-author">{answer.author}</span>}
            {answer.answer}
            {answer.images !== undefined && (
                <ImageList
                    images={answer.images}
                    onClick={(image: string) => {
                        setCurrentImage(image);
                    }}
                />
            )}
        </div>
    );
}
