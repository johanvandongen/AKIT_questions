import * as React from 'react';
import { TableView } from '../components/table/TableView';
import { type ITable } from '../models/ITable';
import { useEffect, useState } from 'react';
import { Create } from '../features/create';
import UserInfo from '../features/userInfo/UserInfo';
import Filter from '../features/filter/Filter';
import UserSettings from '../features/filter/UserSettings';
import { Button, Spinner } from '../components/ui';
import { useAuth0 } from '@auth0/auth0-react';
import { axiosInstance } from '../utils/axiosInstance';

export default function Home(): JSX.Element {
    const [tables, setTables] = useState<ITable[] | null>(null);
    const [activeTables, setActiveTables] = useState<ITable[] | null>(tables);
    const [columns, setColumns] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    const fetchTables = async (): Promise<void> => {
        // Add token here again, since this component is rendered before bearer token is set in axios interceptors
        const token = await getAccessTokenSilently();
        setIsLoading(true);
        await axiosInstance
            .get('/record', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
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
