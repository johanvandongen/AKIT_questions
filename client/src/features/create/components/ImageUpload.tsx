import * as React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import FileInput from '../../../components/ui/input/FileInput';

export interface IImageUploadProps {
    addImages: (images: File[]) => void;
}

/**
 * Input field for uploading images with image preview. Also shows error messages when file is too big or
 * when too many files are being uploaded.
 * @param addImages function that gets called when an image is added
 */
export default function ImageUpload({ addImages }: IImageUploadProps): JSX.Element {
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
                        height: '20vh',
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
            <FileInput
                onAddImage={(images) => {
                    addImages(images);
                }}
                onImageClick={(image: string) => {
                    setCurrentImage(image);
                    setModalIsOpen(true);
                }}
            />
        </div>
    );
}
