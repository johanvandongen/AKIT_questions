import React, { useEffect, useState } from 'react';
import './styling/App.css';
// import { Login } from './features/login/login';
import { type ITable } from './models/ITable';
import Filter from './features/filter/Filter';
import { TableView } from './components/table/TableView';

function App(): JSX.Element {
    // const [user, setUser] = useState<string | null>(null);
    const [tables] = useState<ITable[]>(
        JSON.parse(localStorage.getItem('tables') ?? '[]') as ITable[]
    );
    const [activeTables, setActiveTables] = useState<ITable[]>(
        JSON.parse(localStorage.getItem('tables') ?? '[]') as ITable[]
    );
    // const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        localStorage.setItem('tables', JSON.stringify(tables));
    }, [tables]);

    useEffect(() => {
        setActiveTables(tables);
    }, [tables]);

    return (
        <div className="App" style={{ backgroundColor: '#30475E' }}>
            <div className="header">
                <h1>Author Questions</h1>

                <div className="login"></div>
            </div>

            <div className="settings">
                <div className="right-section">
                    <Filter
                        tables={tables}
                        setActiveTables={(tables) => {
                            setActiveTables(tables);
                        }}
                    />
                </div>
            </div>
            <TableView tables={activeTables} />
        </div>
    );
}

export default App;
