import './tableStyle.css';
import * as React from 'react';
import { type ITable } from '../../models/ITable';
import Table from './Table';

export interface ITableViewProps {
    tables: ITable[];
}

/**
 * Displays a grid of tables.
 * @param tables list of tables.
 */
export function TableView({ tables }: ITableViewProps): JSX.Element {
    return (
        <div className="table-view">
            {tables.map((table: ITable) => (
                <Table key={'table' + table.tableId + table.answer.join()} table={table} />
            ))}
        </div>
    );
}
