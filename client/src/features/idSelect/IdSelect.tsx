import * as React from 'react';
import './IdSelect.css';

export interface IIdSelectProps {
    ids: string[];
}

export default function IdSelect({ ids }: IIdSelectProps): JSX.Element {
    console.log('ids', ids);
    const idList = [...ids, 'wdadhakjdha'];
    return (
        <div className="id-select-container">
            <span className="table-field">Id: </span>
            <div className="dropdown">
                <IdItem id={idList[0]} />
                <div className="dropdown-content">
                    {idList.slice(1, idList.length).map((id) => (
                        <IdItem key={id} id={id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const IdItem = ({ id }: { id: string }): JSX.Element => {
    return (
        <div className="id-item">
            <span>{id}</span>
            <button
                onClick={() => {
                    console.log(id);
                }}
            >
                <svg
                    fill={'#21abd4'}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                >
                    <path d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z" />
                </svg>
            </button>
        </div>
    );
};
