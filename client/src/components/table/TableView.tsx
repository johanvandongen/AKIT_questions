import './tableStyles.css';
import * as React from 'react';
import { type ITable } from '../../models/ITable';
import Table from './Table';
import Modal from 'react-modal';
import { useState } from 'react';

export interface ITableViewProps {
    tables: ITable[];
    refresh: () => void;
}
Modal.setAppElement('#root');
/**
 * Displays a grid of tables.
 * @param tables list of tables.
 */
export function TableView({ tables, refresh }: ITableViewProps): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [CurrentImage, setCurrentImage] = useState('');

    return (
        <div className="table-view">
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
