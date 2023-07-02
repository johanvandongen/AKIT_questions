import { type ITable } from '../../../models/ITable';
import isAnswered from '../../../utils/utils';

export enum treatedOptions {
    yes = 'Yes',
    no = 'No',
    pending = 'Pending',
    all = 'all',
}

/**
 * Returns whether the given table a treated status of {@code answer}.
 * @param table table
 * @param answer which treated state yoy want to filter on.
 */
export const answeredSearch = (table: ITable, answer: treatedOptions): boolean => {
    if (answer === treatedOptions.all) {
        return true;
    } else if (answer === treatedOptions.yes) {
        return isAnswered(table.treated.state);
    } else if (answer === treatedOptions.no) {
        return table.treated.state.trim() === '';
    } else if (answer === treatedOptions.pending) {
        return !isAnswered(table.treated.state) && table.treated.state.trim() !== '';
    }
    return false;
};

/**
 * Returns whether the given table contains the input text.
 * @param table table object we want to seach in
 * @param input text you want to filter on
 */
export const generalSearch = (table: ITable, input: string): boolean => {
    if (input === ' ') {
        return true;
    }

    const values = Object.values(table);
    for (const value of values) {
        let newVal: string = value;
        if (Array.isArray(value)) {
            newVal = value.join();
        }

        if (typeof newVal !== 'string') {
            continue;
        }

        if (newVal.toLowerCase().includes(input.toLowerCase())) {
            return true;
        }
    }
    return false;
};
