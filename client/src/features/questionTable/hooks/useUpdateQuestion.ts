import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import { axiosInstance } from '../../../utils/axiosInstance';

/**
 * @param type the type of answer (answer from a normal author vs senior author)
 * @returns a function to update a question and the request state.
 */
export default function useUpdateQuestion(type: 'finalAnswer' | 'authorReply'): {
    requestState: IRequest;
    updateQuestion: (
        id: string,
        answer: string,
        author: string | undefined,
        images: File[]
    ) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    /** Updates the answers for a given question. */
    const updateQuestion = async (
        id: string,
        answer: string,
        author: string | undefined,
        images: File[]
    ): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        const query = `/record/${type === 'finalAnswer' ? 'answer' : 'reply'}/${id}`;
        // console.log(getFormData({ answer, author, images }));
        await axiosInstance
            .patch(query, answerToFormData(answer, author, images), {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

const answerToFormData = (answer: string, author: string | undefined, images: File[]): FormData => {
    const formData = new FormData();
    formData.append('answer', answer);
    author !== undefined && formData.append('author', author);

    for (const imageFile of images) {
        formData.append('images', imageFile);
    }

    return formData;
};

// function getFormData(object: any): FormData {
//     const formData = new FormData();
//     Object.keys(object).forEach((key) => {
//         formData.append(key, object[key]);
//     });
//     return formData;
// }
