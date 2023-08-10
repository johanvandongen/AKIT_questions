import { useState } from 'react';

export default function useNotificaiton(): {
    isShown: boolean;
    text: string;
    notifiactionType: 'successful' | 'warning' | 'error';
    toggle: () => void;
    showTemporarily: (text: string, notifiactionType?: 'successful' | 'warning' | 'error') => void;
} {
    const [isShown, setIsShown] = useState(false);
    const [text, setText] = useState('');
    const [notifiactionType, setNotificationType] = useState<'successful' | 'warning' | 'error'>(
        'successful'
    );

    const toggle = (): void => {
        setIsShown(!isShown);
    };

    const showTemporarily = (
        text: string,
        notifiactionType?: 'successful' | 'warning' | 'error'
    ): void => {
        setIsShown(true);
        setText(text);
        notifiactionType !== undefined && setNotificationType(notifiactionType);
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    };

    return {
        isShown,
        text,
        notifiactionType,
        toggle,
        showTemporarily,
    };
}
