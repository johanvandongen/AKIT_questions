import * as React from 'react';
import { useState } from 'react';
import Button from './Button';

interface IInputConfirmProps {
    onClick: any;
    description: string;
    buttonText: string;
}

export default function InputConfirm({
    onClick,
    description,
    buttonText,
}: IInputConfirmProps): JSX.Element {
    const [input, setInput] = useState<string>('');

    return (
        <div className="input-confirm">
            <p>{description}</p>

            <input
                type="text"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />
            <Button onClick={() => onClick(input)} text={buttonText} />
        </div>
    );
}
