import { useState } from 'react';
import { type IRequest, RequestState } from '../../../models/IRequest';
import axios from 'axios';
import FileDownload from 'js-file-download';

export default function useExportUnified(): {
    requestState: IRequest;
    exportUnified: () => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    const exportUnified = async (): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        await axios
            .get('http://localhost:5050/data/unified', {})
            .then((response) => {
                FileDownload(response.data, 'AKIT_questions.csv');
                setRequestState({ state: RequestState.Successful, message: '' });
            })
            .catch((error) => {
                console.log(error);
                setRequestState({ state: RequestState.Error, message: error });
            });
    };

    return { requestState, exportUnified };
}
