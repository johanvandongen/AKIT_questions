import * as React from 'react';
import { TableView } from '../components/table/TableView';
import { type ITable } from '../models/ITable';
import { useState } from 'react';
import axios from 'axios';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/spinner/Spinner';
import { Create } from '../features/create';
import UserInfo from '../features/login/UserInfo';

export default function Home(): JSX.Element {
    const [tables, setTables] = useState<ITable[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTables = async (): Promise<void> => {
        setIsLoading(true);
        await axios
            .get('http://localhost:5050/record', {})
            .then((response) => {
                setIsLoading(false);
                console.log('no errorr', response);
                setTables(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            {isLoading && <Spinner text={'Fetching data'} />}

            <div className="home-header">
                <h2>Home screen</h2>
                <Create
                    refresh={() => {
                        void fetchTables();
                    }}
                />
                <Button
                    onClick={() => {
                        void fetchTables();
                    }}
                    text={'Fetch'}
                    theme="orange"
                />
                <UserInfo />
            </div>

            {tables !== null && (
                <TableView
                    tables={tables}
                    refresh={() => {
                        void fetchTables();
                    }}
                />
            )}
        </div>
    );
}
