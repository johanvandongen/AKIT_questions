import * as React from 'react';
import { useState } from 'react';

export default function Create(): JSX.Element {
    const [table, setTable] = useState({
        question: 'how to insert in mongodb',
        answer: 'set up a backend',
    });

    const onSubmit = async (): Promise<void> => {
        // e.preventDefault();
        const newDoc = { name: 'jop', position: 'man', level: 'high' };
        console.log(newDoc);

        await fetch('http://localhost:5050/record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDoc),
        }).catch((error) => {
            console.log(error);
            window.alert(error);
        });
    };

    return (
        <div>
            <input
                type="text"
                value={table.question}
                onChange={(e) => {
                    setTable((prev) => ({ ...prev, question: e.target.value }));
                }}
            />
            <button
                onClick={() => {
                    console.log('here');
                    void onSubmit();
                }}
            >
                Create record
            </button>
        </div>
    );
}
