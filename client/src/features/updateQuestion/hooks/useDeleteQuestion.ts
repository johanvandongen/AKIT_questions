import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import axios from 'axios';

export default function useDeleteQuestion(): {
    requestState: IRequest;
    deleteQuestion: (id: string) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    const deleteQuestion = async (id: string): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        await axios
            .delete(`http://localhost:5050/record/${id}`)
            .then((response) => {
                console.log('succesfully deleted', response);
                setRequestState({ state: RequestState.Successful, message: '' });
            })
            .catch((err) => {
                console.log('smth went wrong', err);
                setRequestState({ state: RequestState.Error, message: err });
            });
    };

    return { requestState, deleteQuestion };
}
