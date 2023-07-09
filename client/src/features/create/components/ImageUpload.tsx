import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IImageUploadProps {
    addImages: (images: string[]) => void;
}

interface IImage {
    base64: string;
}

/**
 * Input field for uploading images with image preview. Also shows error messages when file is too big or
 * when too many files are being uploaded.
 * @param addImages function to set the images in the object that gets sent to the API
 */
export default function ImageUpload({ addImages }: IImageUploadProps): JSX.Element {
    const [postImage, setPostImage] = useState<IImage[]>([]);
    const [imageError, setImageError] = useState('');

    /** Get file, check it, convert it and then set it in state, */
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

    // After a new image has been added. Update the screenshot field in question object.
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
                    name="multi-files"
                    multiple
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
