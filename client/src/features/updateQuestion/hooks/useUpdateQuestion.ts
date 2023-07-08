import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import axios from 'axios';

export default function useUpdateQuestion(): {
    requestState: IRequest;
    updateQuestion: (id: string, answer: string) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    const updateQuestion = async (id: string, answer: string): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        await axios
            .patch(`http://localhost:5050/record/${id}`, JSON.stringify({ answer }), {
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
