import * as React from 'react';
import UserSettings from './UserSettings';
import Filter from './Filter';
import { type ITable } from '../../models/ITable';
import { useState } from 'react';
import FilterStatistic from './FilterStatistic';
import { type IFilterStatistic } from './models/IFilterStatistic';
import { Button } from '../../components/ui';
import { copyTables } from '../../utils/copy.Clipboard';
import { NotificationBox, useNotificaiton } from '../notification';

interface ISettings {
    columns: number;
    setColumns: (columns: number) => void;
    tables: ITable[];
    activeTables: ITable[];
    setActiveTables: (tables: ITable[]) => void;
}

export default function Settings({
    columns,
    setColumns,
    tables,
    activeTables,
    setActiveTables,
}: ISettings): JSX.Element {
    const [filterStatistic, setFilterStatistic] = useState<null | IFilterStatistic>(null);
    const { notification, showTemporarily } = useNotificaiton();

    return (
        <div className="settings">
            <div className="settings-left">
                <UserSettings
                    columns={columns}
                    setColumns={(columns: number) => {
                        setColumns(columns);
                    }}
                />
                <div>
                    <Button
                        onClick={() => {
                            copyTables(activeTables);
                            showTemporarily('Copied to clipboard!', 'successful');
                        }}
                        text={'Copy'}
                    />
                </div>
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
            <NotificationBox notification={notification} />
        </div>
    );
}
