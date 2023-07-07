import * as React from 'react';
import { type ITable } from '../../models/ITable';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import { RequestState } from '../../models/IRequest';
import useUpdateQuestion from './hooks/useUpdateQuestion';

export interface IAnswerProps {
    table: ITable;
    refresh: () => void;
}

export function Answer({ table, refresh }: IAnswerProps): JSX.Element {
    const { requestState: updateState, updateQuestion } = useUpdateQuestion();
    const [answer, setAnswer] = useState('');

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
            {updateState.state === RequestState.Loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="table-row">
                <p>
                    <span className="table-field">Answer:</span>
                </p>
                {table.answer !== '' ? (
                    table.answer
                ) : (
                    <div className="input-field">
                        <textarea
                            value={answer}
                            placeholder={'question'}
                            required={true}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="table-row">
                {table.answer === '' && (
                    <Button
                        onClick={async () => {
                            void updateQuestion(table._id, answer);
                        }}
                        text={'Submit'}
                    />
                )}
            </div>
        </>
    );
}
