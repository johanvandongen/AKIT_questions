import './tableStyles.css';
import './modal.css';
import * as React from 'react';
import Table from './Table';
import Modal from 'react-modal';
import { useMemo, useState } from 'react';
import { type ITable } from '../../../models/ITable';
import { ConfirmModal } from '../../../components/ui/confirmModal/ConfirmModal';

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
    const [deleteModelIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteModelCallback, setDeleteModelCallback] = useState<
        null | (() => (id: string) => Promise<void>)
    >(null);
    const [CurrentImage, setCurrentImage] = useState('');

    // Rendering all tables is expensive, so memo it so it doesnt get rerendered
    // when updating the modal state (opening an image modal should not cause all tables to rerender).
    const tableView = useMemo(
        () =>
            tables.map((table: ITable) => (
                <Table
                    key={'table' + String(table._id)}
                    table={table}
                    refresh={refresh}
                    setCurrentImage={(image: string) => {
                        setCurrentImage(image);
                        setModalIsOpen(true);
                    }}
                    deleteTable={(callback: (id: string) => Promise<void>) => {
                        setDeleteModelCallback(() => callback);
                        setDeleteModalIsOpen(true);
                    }}
                />
            )),
        [tables, columns, refresh]
    );

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

            <ConfirmModal
                modalIsOpen={deleteModelIsOpen}
                setModalIsOpen={(modelIsOpen: boolean) => {
                    setDeleteModalIsOpen(modelIsOpen);
                }}
                callback={() => {
                    if (deleteModelCallback !== null) {
                        void deleteModelCallback();
                    }
                    setDeleteModalIsOpen(false);
                }}
            />

            {tableView}
        </div>
    );
}
