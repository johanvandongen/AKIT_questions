import * as React from 'react';
import './ui.css';

interface IButtonProps {
    onClick: any;
    text: string;
    theme?: 'blue' | 'orange';
}

export default function Button({ onClick, text, theme = 'blue' }: IButtonProps): JSX.Element {
    const className = `button ${theme}`;
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}
