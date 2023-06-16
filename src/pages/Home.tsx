import * as React from 'react';
import { TableView } from '../components/table/TableView';
import { db } from '../database/db';

export default function Home(): JSX.Element {
    void db();

    return (
        <div>
            Home screen
            <TableView tables={[]} />
        </div>
    );
}
