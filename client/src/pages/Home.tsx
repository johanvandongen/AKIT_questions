import * as React from 'react';
import { TableView } from '../components/table/TableView';
import Create from '../features/create/Create';
import { ITable } from '../models/ITable';
import { useState } from 'react';
import axios from 'axios';
import '../features/create/index.css'
import '../features/create/spinner.css'

export default function Home(): JSX.Element {

    const [tables, setTables] = useState<ITable[] | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [succesful, setSuccesful] = useState(false);
    const [error, setError] = useState(false);

    const fetchTables = async () => {
        setIsLoading(true);
        setError(false);
        setSuccesful(false);

        await axios
            .get('http://localhost:5050/record', {})
            .then((response) => {
                setIsLoading(false);
                console.log('no errorr', response);
                setTables(response.data)
                setSuccesful(true);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            
            {isLoading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    )}

            <div className='home-header'>
                <h2>Home screen</h2>
                <Create />
                <button onClick={() => fetchTables()}>Fetch</button>
            </div>
            
            
            {tables !== null && <TableView tables={tables} />}
        </div>
    );
}
