import './tableStyles.css';
import React, { useState } from 'react';
import { type ITable } from '../../models/ITable';
import Treated from './Treated';
import Button from '../ui/Button';
import axios from 'axios';
import '../../features/create/index.css';
import '../../features/create/spinner.css';

interface ITableProps {
    table: ITable;
}

/**
 * Displays the table information in a nice view.
 * @param table table with information
 */
export default function Table({ table }: ITableProps): JSX.Element {
    console.log('tableee', table);
    const [isLoading, setIsLoading] = useState(false);
    const [succesful, setSuccesful] = useState(false);
    // const [error, setError] = useState(false);

    const handelDelete = async (): Promise<void> => {
        setIsLoading(true);
        // setError(false);
        setSuccesful(false);
        await axios
            .delete(`http://localhost:5050/record/${table._id}`)
            .then((response) => {
                console.log('succesfully deleted', response);
                setIsLoading(false);
                setSuccesful(true);
            })
            .catch((err) => {
                console.log('smth went wrong', err);
                setIsLoading(false);
                // setError(true);
            });
    };

    // If deletion was succesful, dont show the table anymore. Could also refetch all tables.
    if (succesful) {
        return <></>;
    }

    return (
        <div className="table-container">
            {isLoading && (
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
            <div className="table-row">
                <p>
                    <span className="table-field">Answer:</span>
                </p>
                {table.answer}
            </div>
            <div className="table-row">
                <Button
                    onClick={async () => {
                        console.log('delete clicked of:', table._id);
                        void handelDelete();
                    }}
                    text={'Delete'}
                />
            </div>
        </div>
    );
}
