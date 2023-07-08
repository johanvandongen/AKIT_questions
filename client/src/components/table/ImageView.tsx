import * as React from 'react';
import './tableStyles.css';
import Modal from 'react-modal';
import { useState } from 'react';

interface IImageListProps {
    images: string[]; // list of images
}
Modal.setAppElement('#root');
export default function ImageList({ images }: IImageListProps): JSX.Element {
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [CurrentImage, setCurrentImage] = useState('');

    return (
        <div>
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
            <div className="image-list-container">
                {images.map((image) => (
                    <div
                        key={image}
                        className="image-container"
                        onClick={() => {
                            console.log('clicked', image[1000]);
                            setCurrentImage(image);
                            setModalIsOpen(true);
                        }}
                    >
                        <img src={image} />
                    </div>
                ))}
            </div>
        </div>
    );
}
