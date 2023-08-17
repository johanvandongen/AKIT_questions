import * as React from 'react';
import { type ITable } from '../models/ITable';
import { useEffect, useState } from 'react';
import { Create } from '../features/create';
import UserInfo from '../features/userInfo/UserInfo';
import { Button, Spinner } from '../components/ui';
import { axiosInstance } from '../utils/axiosInstance';
import { TableView } from '../features/questionTable';
import { NotificationBox, useNotificaiton } from '../features/notification';
import Settings from '../features/filter/Settings';

export default function Home(): JSX.Element {
    const [tables, setTables] = useState<ITable[] | null>(null);
    const [activeTables, setActiveTables] = useState<ITable[] | null>(tables);
    const [columns, setColumns] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const { notification, showTemporarily } = useNotificaiton();

    const fetchTables = async (): Promise<void> => {
        setIsLoading(true);
        await axiosInstance
            .get('/record', {})
            .then((response) => {
                setIsLoading(false);
                console.log('no errorr', response);
                setTables(response.data);
            })
            .catch((error) => {
                console.log(error);
                showTemporarily(
                    error.message === undefined ? 'something went wrong' : error.message,
                    'warning'
                );
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
                <UserInfo />
            </div>

            <Settings
                columns={columns}
                setColumns={(columns: number) => {
                    setColumns(columns);
                }}
                tables={tables === null ? [] : tables}
                activeTables={activeTables === null ? [] : activeTables}
                setActiveTables={(tables: ITable[]) => {
                    setActiveTables(tables);
                }}
            />

            {activeTables !== null && (
                <TableView
                    tables={activeTables}
                    columns={columns}
                    refresh={() => {
                        void fetchTables();
                    }}
                />
            )}
            <NotificationBox notification={notification} />
        </div>
    );
}
