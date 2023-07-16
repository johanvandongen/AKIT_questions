import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import { axiosInstance } from '../../../utils/axiosInstance';

/**
 * @returns a function to delete a question and the request state.
 */
export default function useDeleteQuestion(): {
    requestState: IRequest;
    deleteQuestion: (id: string) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    /** Deletes a question record for the given id. */
    const deleteQuestion = async (id: string): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        await axiosInstance
            .delete(`/record/${id}`)
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
