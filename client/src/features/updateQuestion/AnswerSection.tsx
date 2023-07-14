import * as React from 'react';
import { type IAnswer, type ITable } from '../../models/ITable';
import { useEffect } from 'react';
import { RequestState } from '../../models/IRequest';
import useUpdateQuestion from './hooks/useUpdateQuestion';
import Spinner from '../../components/ui/spinner/Spinner';
import { useAuth0 } from '@auth0/auth0-react';
import { hasRole } from '../login/userRole';
import Answer from './components/Answer';
import AnswerForm from './components/AnswerForm';

const isAnswered = (answer: IAnswer[]): boolean => {
    return answer.length > 0;
};

export interface IAnswerSectionProps {
    table: ITable;
    refresh: () => void;
    type: 'finalAnswer' | 'authorReply';
}

/**
 * Renders the answer section of a question. If an answer does not exist, a textarea to enter a question
 * is given. Pressing submit will update the question.
 * @param table table
 * @param refresh refresh function to refetch all tables
 * @param type the type of answer you want to render (answer from author vs answer from senior-author)
 */
export function AnswerSection({ table, refresh, type }: IAnswerSectionProps): JSX.Element {
    const { user } = useAuth0();
    const { requestState: updateState, updateQuestion } = useUpdateQuestion(type);
    const questionAnswer: IAnswer[] = type === 'finalAnswer' ? table.answer : table.authorReply;

    // If this is a finalAnswer type, you need senior-author permission
    // If this is a authorReply type, you need author permission
    const answerPermission =
        (hasRole(user, 'senior-author') && type === 'finalAnswer') ||
        (hasRole(user, 'author') && type === 'authorReply');
    const allowAddAnswer = answerPermission; // && !isAnswered(questionAnswer);

    // Refetch all questions, after table has been succesfully updated.
    // We could also use the internal answer state, so that we dont need te refetch,
    // but I think it's better to have the database be the source of truth after modifications.
    useEffect(() => {
        if (updateState.state === RequestState.Successful) {
            refresh();
        }
    }, [updateState.state]);

    return (
        <>
            {updateState.state === RequestState.Loading && <Spinner />}

            {(isAnswered(questionAnswer) || answerPermission) && (
                <div className="table-row">
                    <p>
                        <span className="table-field">
                            {type === 'finalAnswer' ? 'Answer' : 'Author Reply:'}
                        </span>
                    </p>
                    {questionAnswer.map((answer) => (
                        <Answer key={answer.answer + answer.date} answer={answer} />
                    ))}
                </div>
            )}

            {allowAddAnswer && <AnswerForm id={table._id} updateQuestion={updateQuestion} />}
        </>
    );
}
