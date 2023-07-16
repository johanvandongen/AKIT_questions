import { useState } from 'react';
import { type IRequest, RequestState } from '../../../models/IRequest';
import axios from 'axios';

export default function useExportSplit(): {
    requestState: IRequest;
    exportSplit: () => Promise<void>;
} {
    const [requestState, setRequestState] = useState<IRequest>({
        state: RequestState.Idle,
        message: '',
    });

    const exportSplit = async (): Promise<void> => {
        setRequestState({ state: RequestState.Loading, message: '' });
        await axios
            .get('http://localhost:5050/data/split', { responseType: 'blob' })
            .then(({ data: blob }) => {
                console.log('blob', blob);
                const objectURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = objectURL;
                link.setAttribute('download', 'AKIT_questions.zip');
                document.getElementById('root')?.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
                setRequestState({ state: RequestState.Successful, message: '' });
            })
            .catch((error) => {
                console.log(error);
                setRequestState({ state: RequestState.Error, message: error });
            });
    };

    return { requestState, exportSplit };
}
