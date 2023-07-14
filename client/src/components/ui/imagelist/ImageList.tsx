import * as React from 'react';
import './ImageList.css';

export interface IImageListProps {
    images: string[];
    onClick: (image: string) => void;
}

/**
 * Renders a list of images.
 * @param images a list of images whose value is used as src attribute
 * @param onClick function that gets called when the image is pressed
 */
export default function ImageList({ images, onClick }: IImageListProps): JSX.Element {
    return (
        <div className="image-list-container">
            {images.map((image) => {
                return (
                    <div
                        key={image}
                        className="image-container"
                        onClick={() => {
                            onClick(image);
                        }}
                    >
                        <img src={image} alt={image} />
                    </div>
                );
            })}
        </div>
    );
}
