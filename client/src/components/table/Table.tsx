import './tableStyles.css';
import React from 'react';
import { type ITable } from '../../models/ITable';
import Treated from './Treated';
import Button from '../ui/Button';
import axios from 'axios';

interface ITableProps {
    table: ITable;
}

/**
 * Displays the table information in a nice view.
 * @param table table with information
 */
export default function Table({ table }: ITableProps): JSX.Element {
    console.log('tableee', table);
    return (
        <div className="table-container">
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
                        await axios
                            .delete(`http://localhost:5050/record/${table._id}`)
                            .then((response) => {
                                console.log('succesfully deleted', response);
                            })
                            .catch((err) => {
                                console.log('smth went wrong', err);
                            });
                    }}
                    text={'Delete'}
                />
            </div>
        </div>
    );
}
