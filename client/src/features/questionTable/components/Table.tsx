import React from 'react';
import { type ITable } from '../../../models/ITable';
import useDeleteQuestion from '../hooks/useDeleteQuestion';
import { hasRole } from '../../login/userRole';
import { useAuth0 } from '@auth0/auth0-react';
import Treated from './Treated';
import IdSelect from './IdSelect';
import AnswerSection from './AnswerSection';
import { RequestState } from '../../../models/IRequest';
import { Button, ImageList, Spinner } from '../../../components/ui';
import './tableStyles.css';

interface ITableProps {
    table: ITable;
    refresh: () => void;
    setCurrentImage: (image: string) => void;
}

/**
 * Displays the question table information in a nice view.
 * @param table table with information
 */
export default function Table({ table, refresh, setCurrentImage }: ITableProps): JSX.Element {
    // console.log('Table rerendered', table);
    const { requestState: deleteState, deleteQuestion } = useDeleteQuestion();
    const { user } = useAuth0();

    // If deletion was succesful, dont show the table anymore. Could also refetch all tables.
    if (deleteState.state === RequestState.Successful) {
        return <></>;
    }

    return (
        <div className="table-container">
            {deleteState.state === RequestState.Loading && <Spinner />}

            <div className="table-header">
                <p>{table.date.substring(0, 10)}</p>
                <p>{table.issue}</p>
                <Treated text={table.treated.state} id={table._id} />
            </div>

            <div className="table-row-horizontal">
                <span className="table-field">Author: </span> {table.author}
            </div>

            {table.exerciseIds.length > 0 && (
                <div className="table-row-horizontal">
                    <span className="table-field">Id:</span>
                    <div className="id-select-container">
                        <IdSelect ids={table.exerciseIds} />
                    </div>
                </div>
            )}

            <div className="table-row">
                <p>
                    <span className="table-field">Question:</span>
                </p>
                <p>{table.question}</p>

                <ImageList
                    images={table.screenshot.map((image) => String(image))}
                    onClick={(image: string) => {
                        setCurrentImage(image);
                    }}
                />
            </div>

            <div className="table-footer">
                <AnswerSection table={table} refresh={refresh} type="finalAnswer" />
                <AnswerSection table={table} refresh={refresh} type="authorReply" />
                {hasRole(user, 'senior-author') && (
                    <div className="table-row">
                        <Button
                            onClick={async () => {
                                void deleteQuestion(table._id);
                            }}
                            text={'Delete'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
