import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Button } from '../../../components/ui';
import ImageUpload from '../../create/components/ImageUpload';

interface IAnswerFormProps {
    id: string;
    updateQuestion: (
        id: string,
        answer: string,
        author: string | undefined,
        images: File[]
    ) => Promise<void>;
}

/**
 * Renders a textarea with a submit button. Submit button is only shown when text is entered.
 * @param id the id of the question (used to update the question data).
 * @param updateQuestion function to update the question data in the database.
 */
export default function AnswerForm({ id, updateQuestion }: IAnswerFormProps): JSX.Element {
    const [answer, setAnswer] = useState('');
    const [images, setImages] = useState<File[]>([]);
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
            <ImageUpload
                addImages={(images: File[]) => {
                    setImages(images);
                }}
            />
            {answer !== '' && (
                <Button
                    onClick={async () => {
                        void updateQuestion(id, answer, user?.nickname, images);
                    }}
                    text={'Submit'}
                />
            )}
        </div>
    );
}
