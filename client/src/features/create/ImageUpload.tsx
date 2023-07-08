// import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IImageUploadProps {
    addImages: (images: string[]) => void;
}

interface IImage {
    base64: string;
}

export default function ImageUpload({ addImages }: IImageUploadProps): JSX.Element {
    const [postImage, setPostImage] = useState<IImage[]>([]);
    const [imageError, setImageError] = useState('');

    const handleFileUpload = async (e: any): Promise<void> => {
        const file = e.target.files[0];
        console.log(file);
        const base64 = await convertToBase64(file);
        const MB1 = 1000 * 1000;
        if (file.size > MB1) {
            setImageError('File too big');
            console.log('file too big');
            return;
        } else {
            setImageError('');
        }

        if (typeof base64 === 'string') {
            if (postImage.length >= 3) {
                setImageError('Only 3 images allowed');
                console.log('only 3 images allowed');
                return;
            }
            setPostImage((prev) => [...prev, { base64 }]);
        }
    };

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

    useEffect(() => {
        addImages(postImage.map((image) => image.base64));
    }, [postImage]);

    return (
        <div>
            <div className="input-field">
                <p>
                    Input files <span className="image-error">{imageError}</span>
                </p>
                <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                        void handleFileUpload(e);
                    }}
                />
            </div>

            {postImage.map((image) => (
                <div key={image.base64} className="image-container">
                    <img src={image.base64} />
                </div>
            ))}
        </div>
    );
}
