import { useState } from 'react';
import { RequestState, type IRequest } from '../../../models/IRequest';
import axios, { type AxiosError } from 'axios';
import { type questionForm } from '../components/Create';

/**
 * Returns a function to make a post request with all question data. Also
 * returns the state {@code IRequest} of the API
 */
export default function useCreateQuestion(): {
    requestState: IRequest;
    createQuestion: (question: questionForm) => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    /** Convert question object to FormData. */
    const toFormData = (question: questionForm): FormData => {
        const formData = new FormData();
        formData.append('question', question.question);
        formData.append('author', question.author);
        formData.append('issue', question.issue);
        for (const id of question.exerciseIds) {
            formData.append('exerciseIds[]', id);
        }
        for (const imageFile of question.screenshot) {
            formData.append('screenshot', imageFile);
        }
        formData.append('chapter', question.chapter);
        formData.append('treated[state]', question.treated.state);
        formData.append('treated[remark]', question.treated.remark);

        question.answer.forEach((answer, index) => {
            formData.append(`answer[${index}][answer]`, answer.answer);
        });
        question.authorReply.forEach((answer, index) => {
            formData.append(`authorReply[${index}][answer]`, answer.answer);
        });
        return formData;
    };

    const createQuestion = async (question: questionForm): Promise<void> => {
        console.log(question);
        setRequestState({ state: RequestState.Loading, message: '' });

        // Need to convert it to formdata so that I can send images in screenshot field
        const formData = toFormData(question);

        await axios
            .post('http://localhost:5050/record', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
