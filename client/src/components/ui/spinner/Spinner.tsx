import * as React from 'react';
import './spinner.css';

interface ISpinnerProps {
    text?: string;
    opacity?: number;
}
/**
 * Shows a loading spinner centered in the closest parent div with position relative.
 * @param text optional text to display below the loading spinner
 * @param opacity optional opacity for white background color. Default is 0.
 */
export default function Spinner({ text, opacity }: ISpinnerProps): JSX.Element {
    return (
        <div
            style={{ backgroundColor: `rgba(255, 255, 255, ${opacity ?? 0})` }}
            className="spinner-container"
        >
            <div className="spinner"></div>
            {text !== null && <p>{text}</p>}
        </div>
    );
}
