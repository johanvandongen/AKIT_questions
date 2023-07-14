import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Button } from '../../../components/ui';

interface IAnswerFormProps {
    id: string;
    updateQuestion: (id: string, answer: string, author: string | undefined) => Promise<void>;
}

export default function AnswerForm({ id, updateQuestion }: IAnswerFormProps): JSX.Element {
    const [answer, setAnswer] = useState('');
    const { user } = useAuth0();

    return (
        <div className="table-row">
            <div className="input-field">
                <textarea
                    value={answer}
                    placeholder={'Answer'}
                    required={true}
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }}
                />
            </div>
            {answer !== '' && (
                <Button
                    onClick={async () => {
                        void updateQuestion(id, answer, user?.nickname);
                    }}
                    text={'Submit'}
                />
            )}
        </div>
    );
}
