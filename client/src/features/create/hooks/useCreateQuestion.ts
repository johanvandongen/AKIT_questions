import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import axios, { type AxiosError } from 'axios';
import { type questionForm } from '../Create';

export default function useCreateQuestion(): {
    requestState: IRequest;
    createQuestion: (question: questionForm) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    const createQuestion = async (question: questionForm): Promise<void> => {
        console.log(question);
        setRequestState({ state: RequestState.Loading, message: '' });

        await axios
            .post('http://localhost:5050/record', JSON.stringify(question), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(`Create question response: \n ${JSON.stringify(response)}`);
                setRequestState({
                    state: RequestState.Successful,
                    message: `Question created succesfully!`,
                });
            })
            .catch((error: AxiosError) => {
                const errorMsg: string = error.message;
                setRequestState({
                    state: RequestState.Error,
                    message: `${errorMsg}`,
                });
                console.log(error);
            })
            .finally(() => {
                console.log('end');
            });
    };

    return { requestState, createQuestion };
}
