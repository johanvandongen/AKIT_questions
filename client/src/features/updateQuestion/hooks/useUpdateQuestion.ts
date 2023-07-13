import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import axios from 'axios';

/**
 * @param type the type of answer (answer from a normal author vs senior author)
 * @returns a function to update a question and the request state.
 */
export default function useUpdateQuestion(type: 'finalAnswer' | 'authorReply'): {
    requestState: IRequest;
    updateQuestion: (id: string, answer: string) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    /** Updates the answers for a given question. */
    const updateQuestion = async (id: string, answer: string): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        const query = `http://localhost:5050/record/${
            type === 'finalAnswer' ? 'answer' : 'reply'
        }/${id}`;
        await axios
            .patch(query, JSON.stringify({ answer }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('succesfully updated', response);
                setRequestState({ state: RequestState.Successful, message: '' });
            })
            .catch((err) => {
                setRequestState({ state: RequestState.Error, message: err });
            });
    };

    return { requestState, updateQuestion };
}
