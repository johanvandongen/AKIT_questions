import * as React from 'react';
import { Tooltip as ReactToolTip } from 'react-tooltip';
import '../App.css';
import { isAnswered } from '../utils/utils';

interface ITreatedProps {
    text: string;
    id: string;
}

/**
 * Returns an icon depending on the text.
 * @param text answering a yes/no wuestion
 * @returns a checkmark icon if the text conveys a yes answer, cross icon if no, and a warning icon otherwise.
 * If the warning icon is returned there is also a tooltip displaying the text.
 */
export default function Treated({ text, id }: ITreatedProps): JSX.Element {
    if (isAnswered(text)) {
        return (
            <>
                <p id={'id' + id}>&#x2713;</p>
                {/* <ReactToolTip place="top" content={text} anchorSelect={'#id' + id} /> */}
            </>
        );
    } else if (text.trim() === '') {
        return (
            <>
                <p id={'id' + id}>&#10006;</p>
                {/* <ReactToolTip place="top" content={'No'} anchorSelect={'#id' + id} /> */}
            </>
        );
    } else {
        return (
            <>
                <p id={'id' + id}>&#9888;</p>
                <ReactToolTip place="top" content={text} anchorSelect={'#id' + id} />
            </>
        );
    }
}
