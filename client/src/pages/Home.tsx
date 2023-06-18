import * as React from 'react';
import { TableView } from '../components/table/TableView';
import Create from '../features/create/Create';
// import { db } from '../server/db';

export default function Home(): JSX.Element {
    // void db();

    return (
        <div>
            Home screen
            <Create />
            <TableView tables={[]} />
        </div>
    );
}
