import * as React from 'react';
import { TableView } from '../components/table/TableView';
import { type ITable } from '../models/ITable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Create } from '../features/create';
import UserInfo from '../features/login/UserInfo';
import Filter from '../features/filter/Filter';
import UserSettings from '../features/filter/UserSettings';
import { Button, Spinner } from '../components/ui';
import FileDownload from 'js-file-download';

export default function Home(): JSX.Element {
    const [tables, setTables] = useState<ITable[] | null>(null);
    const [activeTables, setActiveTables] = useState<ITable[] | null>(tables);
    const [columns, setColumns] = useState(3);
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

    const exportTables = async (): Promise<void> => {
        setIsLoading(true);
        await axios
            .get('http://localhost:5050/data/unified', {})
            .then((response) => {
                setIsLoading(false);
                console.log('export response', response);
                FileDownload(response.data, 'akit_questions.csv');
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        void fetchTables();
    }, []);

    useEffect(() => {
        setActiveTables(tables);
    }, [tables]);

    return (
        <div>
            {isLoading && <Spinner text={'Fetching data'} />}

            <div className="home-header">
                <h1>Home screen</h1>
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
                <Button
                    onClick={() => {
                        void exportTables();
                    }}
                    text={'Export'}
                />
                <UserInfo />
            </div>

            <div className="settings">
                <UserSettings
                    columns={columns}
                    setColumns={(columns: number) => {
                        setColumns(columns);
                    }}
                />
                <Filter
                    tables={tables === null ? [] : tables}
                    setActiveTables={(tables: ITable[]) => {
                        setActiveTables(tables);
                    }}
                />
            </div>

            {activeTables !== null && (
                <TableView
                    tables={activeTables}
                    columns={columns}
                    refresh={() => {
                        void fetchTables();
                    }}
                />
            )}
        </div>
    );
}
