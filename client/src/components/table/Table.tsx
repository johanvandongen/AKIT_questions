import './tableStyles.css';
import React from 'react';
import { type ITable } from '../../models/ITable';
import Treated from './Treated';
import Button from '../ui/Button';
import '../../features/create/index.css';
import '../../features/create/spinner.css';
import { RequestState } from '../../models/IRequest';
import useDeleteQuestion from '../../features/updateQuestion/hooks/useDeleteQuestion';
import { Answer } from '../../features/updateQuestion/Answer';

interface ITableProps {
    table: ITable;
    refresh: () => void;
}

/**
 * Displays the table information in a nice view.
 * @param table table with information
 */
export default function Table({ table, refresh }: ITableProps): JSX.Element {
    console.log('Table rerendered', table);
    const { requestState: deleteState, deleteQuestion } = useDeleteQuestion();

    // If deletion was succesful, dont show the table anymore. Could also refetch all tables.
    if (deleteState.state === RequestState.Successful) {
        return <></>;
    }

    return (
        <div className="table-container">
            {deleteState.state === RequestState.Loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}

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
