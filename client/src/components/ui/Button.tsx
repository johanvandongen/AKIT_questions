import * as React from 'react';
import './ui.css';

interface IButtonProps {
    onClick: any;
    text: string;
}

export default function Button({ onClick, text }: IButtonProps): JSX.Element {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
}
