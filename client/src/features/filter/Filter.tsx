import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../../models/ITable';
import { answeredSearch, authorSearch, generalSearch, treatedOptions } from './utils/filterTable';
import './styles.css';
import { type IFilterStatistic } from './models/IFilterStatistic';
import { authors } from '../../models/authors';

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
    const [author, setAuthor] = useState<string>('all');

    const filter = (input: string): void => {
        if (tables.length === 0) {
            return;
        }

        const t0 = performance.now();
        const activeTables = tables.filter((table) => {
            return (
                Boolean(generalSearch(table, input)) &&
                answeredSearch(table, treated) &&
                authorSearch(table, author)
            );
        });
        setActiveTables(activeTables);
        const t1 = performance.now();
        setFilterStatistics({ nrOfResults: activeTables.length, searchTime: t1 - t0 });
    };

    useEffect(() => {
        filter(input);
    }, [treated, input, author]);

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
                <p>Author</p>
                <select
                    name="author"
                    defaultValue={'all'}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                >
                    {Object.keys(authors).map((key) => (
                        <option key={key} value={authors[key as keyof typeof authors]}>
                            {authors[key as keyof typeof authors]}
                        </option>
                    ))}
                    <option key={'all'} value={'all'}>
                        all
                    </option>
                </select>
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
