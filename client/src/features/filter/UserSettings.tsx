import * as React from 'react';
import './styles.css';

interface IInputConfirmProps {
    columns: number;
    setColumns: (columns: number) => void;
}

export default function UserSettings({ columns, setColumns }: IInputConfirmProps): JSX.Element {
    return (
        <div className="search">
            <div className="search-row">
                <p>Columns</p>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={columns}
                    onChange={(e) => {
                        setColumns(e.target.value as unknown as number);
                    }}
                    step="1"
                />
            </div>
        </div>
    );
}
