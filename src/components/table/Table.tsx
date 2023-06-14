import React from 'react';
import { type ITable } from '../models/ITable';
import '../App.css';
import Treated from './Treated';

interface ITableProps {
    table: ITable;
}

/**
 * Displays the table information in a nice view.
 * @param table table with information
 */
export default function Table({ table }: ITableProps): JSX.Element {
    return (
        <div className="table-container">
            <div className="table-header">
                <p>{table.date}</p>
                <p>{table.issue}</p>
                <Treated text={table.treated} id={table.tableId} />
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
                {table.answer.map((answer) => (
                    <div key={'answer' + table.tableId + answer}>
                        <p>{answer}</p>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}
