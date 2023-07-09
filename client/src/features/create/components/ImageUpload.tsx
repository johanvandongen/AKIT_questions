import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IImageUploadProps {
    addImages: (images: File[]) => void;
}

// interface IImage {
//     base64: string;
// }

/**
 * Input field for uploading images with image preview. Also shows error messages when file is too big or
 * when too many files are being uploaded.
 * @param addImages function to set the images in the object that gets sent to the API
 */
export default function ImageUpload({ addImages }: IImageUploadProps): JSX.Element {
    const [postImage, setPostImage] = useState<File[]>([]);
    const [imagesBase64, setImagesBase64] = useState<string[]>([]);
    const [imageError, setImageError] = useState('');

    /** Get file, check it, convert it and then set it in state, */
    const handleFileUpload = async (e: any): Promise<void> => {
        const file = e.target.files[0] as File;
        console.log(file);
        let base64 = await convertToBase64(file);
        if (typeof base64 !== 'string') {
            base64 = '';
        }
        const MB1 = 1000 * 1000;
        if (file.size > MB1) {
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

    // After a new image has been added. Update the screenshot field in question object.
    useEffect(() => {
        addImages(postImage);
    }, [postImage]);

    // const filesToBase64 = async (files: File[]): Promise<string[]> => {
    //     const promises = files.map(async (image) => {
    //         const im = await convertToBase64(image);
    //         if (typeof im === 'string') {
    //             return im;
    //         }
    //         return '';
    //     });
    //     return await Promise.all(promises);
    // };

    // useEffect(() => {
    //     setImagesBase64(await filesToBase64(postImage));
    // }, [postImage]);

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

            {imagesBase64.map((image) => {
                return (
                    <div key={image} className="image-container">
                        <img src={image} />
                    </div>
                );
            })}
        </div>
    );
}
