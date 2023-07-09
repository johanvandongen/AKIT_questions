import * as React from 'react';
import './tableStyles.css';

interface IImageListProps {
    images: string[]; // list of images
    setCurrentImage: (image: string) => void;
}

export default function ImageList({ images, setCurrentImage }: IImageListProps): JSX.Element {
    return (
        <div>
            <div className="image-list-container">
                {images.map((image) => {
                    const imageUrl = 'http://localhost:5050/' + image;
                    return (
                        <div
                            key={image}
                            className="image-container"
                            onClick={() => {
                                console.log('clicked', image[1000]);
                                setCurrentImage(imageUrl);
                            }}
                        >
                            <img src={imageUrl} alt={imageUrl} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
