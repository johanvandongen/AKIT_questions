import * as React from 'react';
import '../ui.css';

interface IButtonProps {
    onClick: any;
    text: string;
    theme?: 'blue' | 'orange';
    fullWidth?: boolean;
}

export default function Button({
    onClick,
    text,
    theme = 'blue',
    fullWidth = false,
}: IButtonProps): JSX.Element {
    const className = `button ${theme} ${fullWidth ? 'full-width' : ''}`;
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}
