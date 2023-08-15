import * as React from 'react';
import { decimaleRound } from '../../utils/util';
import { type IFilterStatistic } from './models/IFilterStatistic';

interface IFilterStatisticProps {
    filterStatistic: null | IFilterStatistic;
}

export default function FilterStatistic({ filterStatistic }: IFilterStatisticProps): JSX.Element {
    if (filterStatistic === null) {
        return <></>;
    }

    const searchTime = decimaleRound(filterStatistic.searchTime, 5);
    const result = filterStatistic.nrOfResults === 1 ? 'result' : 'results';

    return (
        <>
            <p>
                {filterStatistic.nrOfResults} {result} in {searchTime} milliseconds
            </p>
        </>
    );
}
