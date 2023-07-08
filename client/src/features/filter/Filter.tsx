import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../../models/ITable';
import { answeredSearch, generalSearch, treatedOptions } from './utils/filterTable';

interface IInputConfirmProps {
    tables: ITable[];
    setActiveTables: (tables: ITable[]) => void;
}

export default function Filter({ tables, setActiveTables }: IInputConfirmProps): JSX.Element {
    const [input, setInput] = useState<string>('');
    const [treated, setIsTreated] = useState<treatedOptions>(treatedOptions.all);

    const filter = (input: string): void => {
        setActiveTables(
            tables.filter((table) => {
                return Boolean(generalSearch(table, input)) && answeredSearch(table, treated);
            })
        );
    };

    useEffect(() => {
        filter(input);
    }, [treated, input]);

    return (
        <div className="search">
            <div className="search-row">
                <p>Search</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
            </div>
            <select
                name="answered"
                defaultValue={treated}
                onChange={(e) => {
                    console.log(e.target.value);
                    setIsTreated(e.target.value as treatedOptions);
                }}
            >
                {Object.keys(treatedOptions).map((key) => (
                    <option key={key} value={key}>
                        {treatedOptions[key as keyof typeof treatedOptions]}
                    </option>
                ))}
            </select>
        </div>
    );
}
