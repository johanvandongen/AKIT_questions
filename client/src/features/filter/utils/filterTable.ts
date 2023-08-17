import { type ITable } from '../../../models/ITable';

export enum treatedOptions {
    yes = 'Yes',
    no = 'No',
    pending = 'Pending',
    all = 'all',
}

/**
 * Returns whether the given table has a treated status of {@code answer}.
 * @param table table
 * @param treated which treated state yoy want to filter on.
 */
export const answeredSearch = (table: ITable, treated: treatedOptions): boolean => {
    if (treated === treatedOptions.all) {
        return true;
    }
    return table.treated.state === treatedOptions[treated as keyof typeof treatedOptions];
};

/**
 * Returns whether the given table has an author named {@code author}.
 * @param table table
 * @param author the name of the author.
 */
export const authorSearch = (table: ITable, author: string): boolean => {
    if (author === 'all') {
        return true;
    }
    return table.author === author;
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
