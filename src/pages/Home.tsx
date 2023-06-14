import * as React from 'react';
import { TableView } from '../components/table/TableView';

export default function Home(): JSX.Element {
    return (
        <div>
            Home screen
            <TableView tables={[]} />
        </div>
    );
}
