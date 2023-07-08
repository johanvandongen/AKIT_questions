import * as React from 'react';
import './spinner.css';

/**
 * Shows a loading spinner centered in the closest parent div with position relative.
 */
export default function Spinner(): JSX.Element {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
}
