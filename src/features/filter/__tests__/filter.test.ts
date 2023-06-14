import { type ITable } from '../../../models/ITable';
import { answeredSearch, generalSearch, treatedOptions } from '../utils/filter';

const testTable: ITable = {
    tableId: 'This',
    author: 'is',
    date: 'a',
    issue: 'test',
    exerciseId: 'table',
    screenshot: undefined,
    question: [],
    chapter: 'for',
    treated: 'Ja',
    answer: ['jest'],
    authorReply: ['testing', 'nice isnt it'],
};

const testTable2: ITable = {
    tableId: 'Ja',
    author: 'Ja',
    date: 'Ja',
    issue: 'Ja',
    exerciseId: 'Ja',
    screenshot: undefined,
    question: ['Ja'],
    chapter: 'Ja',
    treated: 'No',
    answer: ['Ja'],
    authorReply: ['Ja'],
};
describe('filter table', () => {
    test('treated search', () => {
        expect(answeredSearch(testTable, treatedOptions.yes)).toBe(true);
    });

    test('treated search - only search in treated field', () => {
        expect(answeredSearch(testTable2, treatedOptions.yes)).toBe(false);
    });
});

describe('general search', () => {
    test('general search', () => {
        expect(generalSearch(testTable, 'this')).toBe(true);
        expect(generalSearch(testTable, 'it')).toBe(true);
        expect(generalSearch(testTable, 'phone')).toBe(false);
    });

    test('general search empty string', () => {
        expect(generalSearch(testTable, ' ')).toBe(true);
        expect(generalSearch(testTable, '')).toBe(true);
    });
});
