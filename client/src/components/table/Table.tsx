import './tableStyles.css';
import React from 'react';
import { type ITable } from '../../models/ITable';
import Treated from './Treated';
import Button from '../ui/Button';
import '../../features/create/components/index.css';
import { RequestState } from '../../models/IRequest';
import useDeleteQuestion from '../../features/updateQuestion/hooks/useDeleteQuestion';
import { Answer } from '../../features/updateQuestion/Answer';
import Spinner from '../ui/spinner/Spinner';
import ImageList from '../imagelist/ImageList';
// import ImageList from './ImageView';

interface ITableProps {
    table: ITable;
    refresh: () => void;
    setCurrentImage: (image: string) => void;
}

/**
 * Displays the table information in a nice view.
 * @param table table with information
 */
export default function Table({ table, refresh, setCurrentImage }: ITableProps): JSX.Element {
    // console.log('Table rerendered', table);
    const { requestState: deleteState, deleteQuestion } = useDeleteQuestion();

    // If deletion was succesful, dont show the table anymore. Could also refetch all tables.
    if (deleteState.state === RequestState.Successful) {
        return <></>;
    }

    return (
        <div className="table-container">
            {deleteState.state === RequestState.Loading && <Spinner />}

            <div className="table-header">
                <p>{table.date}</p>
                <p>{table.issue}</p>
                <Treated text={table.treated.state} id={table._id} />
            </div>

            <div className="table-row-horizontal">
                <span className="table-field">Author: </span> {table.author}
            </div>
            <div className="table-row">
                <p>
                    <span className="table-field">Question:</span>
                </p>
                <p>{table.question}</p>

                <ImageList
                    images={table.screenshot.map(
                        (image) => 'http://localhost:5050/' + String(image)
                    )}
                    onClick={(image: string) => {
                        setCurrentImage(image);
                    }}
                />
            </div>
            <Answer table={table} refresh={refresh} />
            <div className="table-row">
                <Button
                    onClick={async () => {
                        void deleteQuestion(table._id);
                    }}
                    text={'Delete'}
                />
            </div>
        </div>
    );
}
