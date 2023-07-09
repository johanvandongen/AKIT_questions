import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ImageList from '../../../components/imagelist/ImageList';

export interface IImageUploadProps {
    addImages: (images: File[]) => void;
}

/**
 * Input field for uploading images with image preview. Also shows error messages when file is too big or
 * when too many files are being uploaded.
 * @param addImages function to set the images in the object that gets sent to the API
 */
export default function ImageUpload({ addImages }: IImageUploadProps): JSX.Element {
    const [postImage, setPostImage] = useState<File[]>([]);
    const [imagesBase64, setImagesBase64] = useState<string[]>([]);
    const [imageError, setImageError] = useState('');
    const [randomKey, setRandomKey] = useState(''); // state used to force a react rerender (kinda hacky)
    const [modelIsOpen, setModalIsOpen] = useState(false);
    const [CurrentImage, setCurrentImage] = useState('');

    /** Get file, check it, convert it and then set it in state, */
    const handleFileUpload = async (e: any): Promise<void> => {
        const file: File = e.target.files[0] as File;
        console.log(file);
        const base64 = await convertToBase64(file);

        const maxKbSize = 1024 * 1024;
        if (file.size > maxKbSize) {
            setImageError('File too big');
            console.log('file too big');
            return;
        } else {
            setImageError('');
        }

        if (postImage.length >= 3) {
            setImageError('Only 3 images allowed');
            console.log('only 3 images allowed');
            return;
        }
        setPostImage((prev) => [...prev, file]);

        if (typeof base64 === 'string') {
            setImagesBase64((prev) => {
                if (typeof base64 !== 'string') {
                    return [...prev];
                }
                return [...prev, base64];
            });
        }
    };

    /** Convert file to base64. */
    const convertToBase64 = async (file: any): Promise<string | ArrayBuffer | null> => {
        return await new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Remove error message and rerender input by updating randomKey.
    useEffect(() => {
        if (imageError !== '') {
            setTimeout(() => {
                setImageError('');
                setRandomKey(Math.random().toString());
            }, 1500);
        }
    }, [imageError]);

    // After a new image has been added. Update the screenshot field in question object.
    useEffect(() => {
        addImages(postImage);
    }, [postImage]);

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

            <div className="input-field">
                <p>Input files</p>
                <input
                    key={randomKey}
                    accept="image/*"
                    name="multi-files"
                    type="file"
                    onChange={(e) => {
                        void handleFileUpload(e);
                    }}
                />
            </div>
            <ImageList
                images={imagesBase64}
                onClick={(image: string) => {
                    setCurrentImage(image);
                    setModalIsOpen(true);
                }}
            />
            <span className="image-error">{imageError}</span>
        </div>
    );
}
