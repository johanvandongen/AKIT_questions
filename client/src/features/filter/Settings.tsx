import * as React from 'react';
import UserSettings from './UserSettings';
import Filter from './Filter';
import { type ITable } from '../../models/ITable';
import { useState } from 'react';
import FilterStatistic from './FilterStatistic';
import { type IFilterStatistic } from './models/IFilterStatistic';

interface ISettings {
    columns: number;
    setColumns: (columns: number) => void;
    tables: ITable[];
    setActiveTables: (tables: ITable[]) => void;
}

export default function Settings({
    columns,
    setColumns,
    tables,
    setActiveTables,
}: ISettings): JSX.Element {
    const [filterStatistic, setFilterStatistic] = useState<null | IFilterStatistic>(null);

    return (
        <div className="settings">
            <div className="settings-left">
                <UserSettings
                    columns={columns}
                    setColumns={(columns: number) => {
                        setColumns(columns);
                    }}
                />
                <FilterStatistic filterStatistic={filterStatistic} />
            </div>
            <Filter
                tables={tables === null ? [] : tables}
                setActiveTables={(tables: ITable[]) => {
                    setActiveTables(tables);
                }}
                setFilterStatistics={(filterStatistic: IFilterStatistic) => {
                    setFilterStatistic(filterStatistic);
                }}
            />
        </div>
    );
}
