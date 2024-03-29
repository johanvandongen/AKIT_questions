import * as React from 'react';
import './tableStyles.css';
import { DropdownNoSelect } from '../../../components/ui';

export interface IIdSelectProps {
    ids: string[];
}

/**
 * Renders a dropdown list of exercise ids, where each item has two buttons (copy and open)
 * @param ids list of ids
 */
export default function IdSelect({ ids }: IIdSelectProps): JSX.Element {
    return <DropdownNoSelect itemList={ids} renderItem={IdItem} />;
}

const IdItem = (id: string): JSX.Element => {
    return (
        <div className={'item-container'}>
            <span>{id}</span>
            <button
                onClick={() => {
                    void navigator.clipboard.writeText(id);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z" />
                </svg>
            </button>

            <button
                onClick={() => {
                    window.open(`https://cms.staging.algebrakit.com/cms/id-search/${id}`);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
            </button>
        </div>
    );
};
