import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../../models/ITable';
import { answeredSearch, generalSearch, treatedOptions } from './utils/filterTable';
import './styles.css';
import { type IFilterStatistic } from './models/IFilterStatistic';

interface IInputConfirmProps {
    tables: ITable[];
    setActiveTables: (tables: ITable[]) => void;
    setFilterStatistics: (filterStatistic: IFilterStatistic) => void;
}

export default function Filter({
    tables,
    setActiveTables,
    setFilterStatistics,
}: IInputConfirmProps): JSX.Element {
    const [input, setInput] = useState<string>('');
    const [treated, setIsTreated] = useState<treatedOptions>(treatedOptions.all);

    const filter = (input: string): void => {
        if (tables.length === 0) {
            return;
        }

        const t0 = performance.now();
        const activeTables = tables.filter((table) => {
            return Boolean(generalSearch(table, input)) && answeredSearch(table, treated);
        });
        setActiveTables(activeTables);
        const t1 = performance.now();
        setFilterStatistics({ nrOfResults: activeTables.length, searchTime: t1 - t0 });
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
            <div className="search-row">
                <p>Treated</p>
                <select
                    name="answered"
                    defaultValue={treated}
                    onChange={(e) => {
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
        </div>
    );
}
