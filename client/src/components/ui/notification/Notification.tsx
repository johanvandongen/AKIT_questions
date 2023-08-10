import * as React from 'react';
import './notification.css';

interface INotificationProps {
    visible: boolean;
    text: string;
    theme?: 'successful' | 'warning' | 'error';
}

export default function Notification({
    visible,
    text,
    theme = 'warning',
}: INotificationProps): JSX.Element {
    const className = `notification ${theme}`;
    return <>{visible && <div className={className}>{text}</div>}</>;
}
