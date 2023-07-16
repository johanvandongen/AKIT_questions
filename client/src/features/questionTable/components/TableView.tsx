import './tableStyles.css';
import * as React from 'react';
import Table from './Table';
import Modal from 'react-modal';
import { useState } from 'react';
import { type ITable } from '../../../models/ITable';

export interface ITableViewProps {
    tables: ITable[];
    columns: number;
    refresh: () => void;
}
Modal.setAppElement('#root');
/**
 * Displays a grid of tables.
 * @param tables list of tables.
 * @param columns the number of tables in a row
 * @param refresh function to refetch all tables from database
 */
export function TableView({ tables, columns, refresh }: ITableViewProps): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [CurrentImage, setCurrentImage] = useState('');

    return (
        <div className="table-view" style={{ gridTemplateColumns: '1fr '.repeat(columns) }}>
            <Modal
                isOpen={modelIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
                style={{
                    content: {
                        width: '50%',
                        height: '70vh',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '1rem',
                    },
                }}
            >
                <div className="image-in-modal">
                    <img src={CurrentImage} />
                </div>
            </Modal>

            {tables.map((table: ITable) => (
                <Table
                    key={'table' + String(table._id) + String(table.answer)}
                    table={table}
                    refresh={refresh}
                    setCurrentImage={(image: string) => {
                        setCurrentImage(image);
                        setModalIsOpen(true);
                    }}
                />
            ))}
        </div>
    );
}
